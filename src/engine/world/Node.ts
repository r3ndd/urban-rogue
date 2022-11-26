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

	constructor(
		public readonly Name: string,
		public readonly Desc: string,
		public readonly RegionParent?: VirtualNode,
		public readonly DirectParent?: VirtualNode,
	) {
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

	constructor(
		name: string,
		desc: string,
		regionParent: VirtualNode,
		directParent?: VirtualNode
	) {
		super(name, desc, regionParent, directParent);

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
	constructor(
		name: string,
		desc: string,
		regionParent?: VirtualNode,
		directParent?: VirtualNode,
		public NestedNode?: Node,
		public Distance: number = 0
	) {
		super(name, desc, regionParent, directParent);
	}

	GetNextGroundNode(): GroundNode {
		var node: Node = this;

		while ((node as VirtualNode).NestedNode != null)
			node = (node as VirtualNode).NestedNode;

		return node as GroundNode;
	}
}

export class Edge {
	constructor(protected nodeA: Node, protected nodeB: Node, public Flags: EdgeFlags, protected length: number = 0) { }

	UpdateFlag(flag: string, value: boolean) {
		this.Flags[flag] = value;
	}

	get NodeA(): Node {
		return this.nodeA;
	}

	get NodeB(): Node {
		return this.nodeB;
	}

	get Distance(): number {
		return this.length;
	}
}