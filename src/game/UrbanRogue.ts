import Game from "../engine/Game";
import UrbanRogueWorld from "./World";

export default class UrbanRogue extends Game {
	constructor() {
		super();

		this.World = new UrbanRogueWorld(this);
	}

	Load() {
		this.World.Generate();
	}
}