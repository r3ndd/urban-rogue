import Engine from "./Engine";
import type Player from "./entity/Player";
import type World from "./world/World";

export default abstract class Game {
	protected engine: Engine;
	protected world: World;
	protected fps: 10;

	constructor() {
		this.engine = new Engine(this);
	}

	Start() {
		this.Engine.StartRenderLoop(this.fps);
	}

	get Engine(): Engine {
		return this.engine;
	}

	get World(): World {
		return this.world;
	}

	get Player(): Player {
		return this.world.Player;
	}
}