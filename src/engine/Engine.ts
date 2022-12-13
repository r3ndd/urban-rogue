import type Game from "./Game";
import type TurnManager from "./entity/TurnManager";
import type InputManager from "./InputManager";
import type ControlsManager from "./ControlsManager";

type Renderer = (game: Game) => void;

export default class Engine {
	public TurnManager: TurnManager;
	public InputManager: InputManager;
	public Controls: ControlsManager;
	private renderers: Renderer[];
	private renderInterval: NodeJS.Timer;

	constructor(
		private game: Game,
		_TurnManager: typeof TurnManager,
		_InputManager: typeof InputManager,
		_ControlsManager: typeof ControlsManager
	) {
		this.TurnManager = new _TurnManager();
		this.InputManager = new _InputManager();
		this.Controls = new (_ControlsManager as any)(game);
		this.renderers = [];
	}

	AddRenderer(renderer: Renderer) {
		this.renderers.push(renderer);
	}

	Render() {
		for (let renderer of this.renderers)
			renderer(this.game);
	}

	async Run() {
		this.StartRenderLoop();

		while (true)
			await this.TurnManager.ProcessTurnRound();
	}

	StartRenderLoop() {
		this.renderInterval = setInterval(() => this.Render(), 1 / this.game.Fps);
	}
}