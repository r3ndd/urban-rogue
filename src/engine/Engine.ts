import type Game from "./Game";
import TurnManager from "./entity/TurnManager";
import InputManager from "./InputManager";

type Renderer = (game: Game) => void;

export default class Engine {
	public readonly TurnManager: TurnManager;
	public readonly InputManager: InputManager;
	private renderers: Renderer[];

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
}