import ControlsManager from "../engine/ControlsManager";
import type Node from "../engine/world/Node";
import type Game from "../engine/Game";
import type { GroundNode, VirtualNode } from "../engine/world/Node";

export default class UrbanRogueControls extends ControlsManager {
	constructor(game: Game) {
		super(game, "base");

		game.Engine.InputManager.RegisterKeyListener("m", (e: KeyboardEvent) => this.OnMKey(e));
		game.Engine.InputManager.RegisterNumKeyListener((num: number, e: KeyboardEvent) => this.OnNumKey(num, e));
	}

	OnEscKey() {
		this.state = "base";
	}

	OnMKey(event: KeyboardEvent) {
		switch (this.state) {
			case "base":
				this.state = "move";
				break;
		}
	}

	OnNumKey(num: number, event: KeyboardEvent) {
		switch (this.state) {
			case "move":
				for (let i in this.adjacentNodes) {
					let node: Node = this.adjacentNodes[i];

					if (Number(i) == num) {
						let toNode: GroundNode =
							(node as VirtualNode).NestedNode as GroundNode ||
							node as GroundNode;
						// Maybe traverse nested virtual nodes?

						if (node.constructor.name == "GroundNode")
							toNode = node as GroundNode;

						this.game.Player.Move(toNode);
						return;
					}
				}

				break;
		}
	}

	GetControlsData(): Record<string, string> {
		switch (this.state) {
			case "base":
				return {};
			case "move":
				return {};
		}
	}

	private get adjacentNodes(): Node[] {
		return Array.from(this.game.Player.Location.AdjacentNodes);
	}
}