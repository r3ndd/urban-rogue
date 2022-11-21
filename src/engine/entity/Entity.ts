import type Game from "../Game";
import type Actor from "./actions/Actor";
import type { Reaction } from "./actions/Action";
import type { GroundNode } from "../world/Node";

export type Statuses = Record<string, number>;

export default abstract class Entity {
	public readonly abstract Name: string;
	public readonly abstract Desc: string;
	protected location: GroundNode;
	protected statuses: Statuses;
	protected reactions: Map<string, typeof Reaction>;

	constructor(protected game: Game, _location: GroundNode) {
		if (_location != null)
			this.Spawn(_location);
	}

	IncStatus(key: string) {
		if (this.statuses[key] == undefined)
			this.statuses[key] = 0;

		this.statuses[key]++;
	}

	DecStatus(key: string) {
		if (this.statuses[key] != undefined) {
			this.statuses[key]--;

			if (this.statuses[key] < 1)
				delete this.statuses[key];
		}
	}

	RegisterReaction(name: string, reaction: typeof Reaction) {
		this.reactions.set(name, reaction);
	}

	React(actionName: string, actor: Actor, ...args: any) {
		var reaction = this.reactions.get(actionName);

		if (reaction != undefined) {
			reaction.Run(this, actor, ...args);
		}
	}

	Spawn(node: GroundNode) {
		this.location = node;
		this.location.AddEntity(this);
	}

	Move(toNode: GroundNode) {
		this.location.RemoveEntity(this);
		this.location = toNode;
		this.location.AddEntity(this);
	}

	get Location(): GroundNode {
		return this.location;
	}
}