import type Actor from "./Actor";
import type Entity from "../Entity";

export default abstract class Action {

	abstract Run();
	abstract Condition(): boolean;

}

export abstract class SelfAction extends Action {
	constructor(protected self: Actor) {
		super();
	}
}

export abstract class TargetAction extends Action {
	constructor(protected self: Actor, protected target: Entity) {
		super();
	}

	TriggerReaction(...args: any) {
		this.target.React(this.constructor.name, this.self, ...args);
	}
}

export abstract class Reaction {
	static Run(self: Entity, actor: Actor, ...args: any) { }
}