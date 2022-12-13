import Game from "../engine/Game";
import TurnManager from "../engine/entity/TurnManager";
import InputManager from "../engine/InputManager";
import UrbanRogueControls from "./ControlsManager";
import UrbanRogueWorld from "./World";

export default class UrbanRogue extends Game {
	constructor() {
		super(TurnManager, InputManager, UrbanRogueControls, UrbanRogueWorld);
	}

	Load() {
		this.world.Generate();
	}
}