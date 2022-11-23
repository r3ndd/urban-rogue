import Game from "../engine/Game";
import UrbanRogueWorld from "./World";

export default class UrbanRogue extends Game {
	constructor() {
		super();

		this.world = new UrbanRogueWorld(this);
	}

	Load() {
		this.world.Generate();
	}
}