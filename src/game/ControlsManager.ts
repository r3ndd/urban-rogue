import ControlsManager from "../engine/ControlsManager";
import type Game from "../engine/Game";
import type { VirtualNode } from "../engine/world/Node";

export default class UrbanRogueControls extends ControlsManager {
	constructor(game: Game) {
		super(game);
	}

	GetControlsData(): Record<string, Record<string, string>> {
		switch (this.state) {
			case "base":
				return {
					"core": {
						"M": "Move",
						"I": "Inventory",
						"Space": "Search commands",
					},
					"locations": {},
				};
			case "move":
				var controlData = {
					"core": {
						"Esc": "Return"
					},
					"locations": {},
				};

				for (let i = this.pageControlsIndex; i < this.adjacentNodes.length && i - this.pageControlsIndex < 10; i++) {
					let node = this.adjacentNodes[i];
					controlData.locations[String(i - this.pageControlsIndex + 1)] = node.Name;
				}

				return controlData;
		}
	}
}