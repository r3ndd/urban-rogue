import type Entity from "../entity/Entity";
import type Game from "../Game";

type NodeEntity = Entity | typeof Entity;
type NodeType = "Ground" | "Virtual";

interface EdgeFlags {
	movement: boolean
	combatMove: boolean
	visbility: boolean
	closeAttack: boolean
	rangedAttack: boolean
}

export const Flags_OpenPath: EdgeFlags = {
	movement: true,
	combatMove: true,
	visbility: true,
	closeAttack: false,
	rangedAttack: true
};

export const Flags_ObscuredPath: EdgeFlags = {
	movement: true,
	combatMove: true,
	visbility: false,
	closeAttack: false,
	rangedAttack: false
};

export const Flags_Window: EdgeFlags = {
	movement: false,
	combatMove: false,
	visbility: true,
	closeAttack: false,
	rangedAttack: true
};

export const Flags_WideOpenSpace: EdgeFlags = {
	movement: true,
	combatMove: false,
	visbility: true,
	closeAttack: false,
	rangedAttack: true
};

export default class Node {
	protected edges: Map<Node, Edge>;

	constructor(public readonly Name: string, public readonly Desc: string, public readonly Parent?: VirtualNode) {
		this.edges = new Map<Node, Edge>();
	}

	Connect(node: Node, edgeFlags: EdgeFlags, propagated: boolean = false) {
		var edge = this.edges.get(node);

		if (edge == null) {
			edge = new Edge(this, node, edgeFlags);
			this.edges.set(node, edge);
		}
		else {
			edge.Flags = edgeFlags;
		}

		if (!propagated)
			node.Connect(this, edgeFlags, true);
	}

	GetEdge(node: Node): Edge {
		return this.edges.get(node);
	}

	get AdjacentNodes(): IterableIterator<Node> {
		return this.edges.keys();
	}

}

export class GroundNode extends Node {
	protected entities: Map<NodeEntity, number>;

	constructor(name: string, desc: string, parent: VirtualNode) {
		super(name, desc, parent);

		this.entities = new Map<Entity, number>();
	}

	AddEntity(entity: Entity) {
		this.entities.set(entity, 1);
	}

	AddPassiveEntity(entity: typeof Entity) {
		var count = this.entities.get(entity) || 0;
		this.entities.set(entity, count + 1);
	}

	RemoveEntity(entity: Entity) {
		this.entities.delete(entity);
	}

	RemovePassiveEntity(entity: typeof Entity) {
		var count = this.entities.get(entity) || 0;
		count--;

		if (count < 1)
			this.entities.delete(entity);
		else
			this.entities.set(entity, count);
	}

	InstantiateEntity(entity: typeof Entity, game: Game) {
		var count = this.entities.get(entity) || 0;

		if (count > 0) {
			this.RemovePassiveEntity(entity);
			this.AddEntity(new (entity as any)(game, this));
		}
	}
}

export class VirtualNode extends Node {
	public NestedNode: Node;

	constructor(name: string, desc: string, parent?: VirtualNode, nestedNode?: Node) {
		super(name, desc, parent);

		this.NestedNode = nestedNode;
	}

	GetNextGroundNode(): GroundNode {
		var node: Node = this;

		while ((node as VirtualNode).NestedNode != null)
			node = (node as VirtualNode).NestedNode;

		return node as GroundNode;
	}
}

export class Edge {
	constructor(protected nodeA: Node, protected nodeB: Node, protected flags: EdgeFlags, protected length: Number = 0) { }

	UpdateFlag(flag: string, value: boolean) {
		this.flags[flag] = value;
	}

	get NodeA(): Node {
		return this.nodeA;
	}

	get NodeB(): Node {
		return this.nodeB;
	}

	get Flags(): EdgeFlags {
		return this.flags;
	}

	set Flags(_flags: EdgeFlags) {
		this.flags = _flags;
	}
}