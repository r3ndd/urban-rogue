import ControlsManager from "../engine/ControlsManager";
import type Game from "../engine/Game";

export default class UrbanRogueControls extends ControlsManager {
	constructor(game: Game) {
		super(game, "base");
	}

	GetControlsData(): Record<string, string> {
		switch (this.state) {
			case "base":
				return {};
			case "move":
				return {};
		}
	}
}