import Engine from "./Engine";
import type ControlsManager from "./ControlsManager";
import type Player from "./entity/Player";
import type TurnManager from "./entity/TurnManager";
import type InputManager from "./InputManager";
import type World from "./world/World";

export default abstract class Game {
	protected engine: Engine;
	protected world: World;
	protected fps: 10;
	protected events: string[] = [];

	constructor(
		_TurnManager: typeof TurnManager,
		_InputManager: typeof InputManager,
		_ControlsManager: typeof ControlsManager,
		_World: typeof World,
	) {
		this.engine = new Engine(this, _TurnManager, _InputManager, _ControlsManager);
		this.world = new (_World as any)(this);
	}

	abstract Load();

	async Run() {
		this.Controls.Init();
		await this.Engine.Run();
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

	get TurnManager(): TurnManager {
		return this.engine.TurnManager;
	}

	get InputManager(): InputManager {
		return this.engine.InputManager;
	}

	get Controls(): ControlsManager {
		return this.engine.Controls;
	}

	get Fps(): number {
		return this.fps;
	}

	get Events(): string[] {
		return this.events;
	}
}