import type Game from "./Game";
import type { KeyDir } from "./InputManager";
import type Node from "./world/Node";

export default abstract class ControlsManager {
	protected movePage: number = 0;

	constructor(protected game: Game, protected state: string, useDefaults: boolean = true) {
		if (useDefaults) {
			game.Engine.InputManager.RegisterKeyListener("m", (e: KeyboardEvent) => this.OnMKey(e));
			game.Engine.InputManager.RegisterNumKeyListener((num: number, e: KeyboardEvent) => this.OnNumKey(num, e));
			game.Engine.InputManager.RegisterDirKeyListener((dir: KeyDir, e: KeyboardEvent) => this.OnDirKey(dir, e));
		}
	}

	abstract GetControlsData(): Record<string, string>;

	OnEscKey() {
		this.state = "base";
	}

	OnMKey(event: KeyboardEvent) {
		switch (this.state) {
			case "base":
				this.state = "move";
				break;
		}
	}

	OnNumKey(num: number, event: KeyboardEvent) {
		switch (this.state) {
			case "move":
				for (let i in this.adjacentNodes) {
					let node: Node = this.adjacentNodes[i];

					if (Number(i) == num) {
						this.game.Player.Move(node);
						return;
					}
				}

				break;
		}
	}

	OnDirKey(dir: KeyDir, event: KeyboardEvent) {
		switch (this.state) {
			case "move":

		}
	}

	private get adjacentNodes(): Node[] {
		return Array.from(this.game.Player.Location.AdjacentNodes);
	}

}