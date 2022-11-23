import type Game from "./Game";
import TurnManager from "./entity/TurnManager";
import InputManager from "./InputManager";

type Renderer = (game: Game) => void;

export default class Engine {
	public readonly TurnManager: TurnManager;
	public readonly InputManager: InputManager;
	private renderers: Renderer[];
	private renderInterval: NodeJS.Timer;
	private fps: number;

	constructor(private game: Game) {
		this.TurnManager = new TurnManager();
		this.InputManager = new InputManager();
		this.renderers = [];
	}

	AddRenderer(renderer: Renderer) {
		this.renderers.push(renderer);
	}

	Render() {
		for (let renderer of this.renderers)
			renderer(this.game);
	}

	StartRenderLoop(_fps: number) {
		this.renderInterval = setInterval(() => this.Render(), 1 / _fps);
		this.fps = _fps;
	}
}