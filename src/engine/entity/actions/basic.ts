import type Node from "../../world/Node";
import type Actor from "./Actor";
import { SelfAction } from "./Action";

export class MoveSelf extends SelfAction {
	constructor(self: Actor, private toNode: Node) {
		super(self);
	}

	Run() {
		this.self.Move(this.toNode);
	}

	Condition(): boolean {
		var edge = this.self.Location.GetEdge(this.toNode);
		return edge.Flags.movement;
	}
}