import Game from "../engine/Game";
import UrbanRogueControls from "./ControlsManager";
import UrbanRogueWorld from "./World";

export default class UrbanRogue extends Game {
	constructor() {
		super();

		this.world = new UrbanRogueWorld(this);
		this.controls = new UrbanRogueControls(this);
	}

	Load() {
		this.world.Generate();
	}
}