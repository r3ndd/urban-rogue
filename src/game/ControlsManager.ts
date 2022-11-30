import ControlsManager from "../engine/ControlsManager";
import type Game from "../engine/Game";
import type { VirtualNode } from "../engine/world/Node";

export default class UrbanRogueControls extends ControlsManager {
	constructor(game: Game) {
		super(game, "base");
	}

	GetControlsData(): Record<string, string> {
		switch (this.state) {
			case "base":
				return {
					"M": "Move",
					"I": "Inventory",
					"Space": "Search commands",
				};
			case "move":
				var controlData = { "Esc": "Return" };

				if (this.moveViewNode.DirectParent != null)
					controlData["K/UpArrow"] = "View Parent Location";

				if ((this.moveViewNode as VirtualNode).NestedNode != null)
					controlData["J/DownArrow"] = "View Nested Location";

				for (let i = this.pageControlsIndex; i < this.adjacentNodes.length && i - this.pageControlsIndex < 10; i++) {
					let node = this.adjacentNodes[i];
					controlData[String(i - this.pageControlsIndex)] = node.Name;
				}

				return controlData;
		}
	}
}