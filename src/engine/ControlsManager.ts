import { MoveSelf } from "./entity/actions/basic";
import type Game from "./Game";
import type { KeyDir } from "./InputManager";
import type { VirtualNode } from "./world/Node";
import type Node from "./world/Node";

export default abstract class ControlsManager {
	protected moveViewNode: Node;
	protected movePage: number = 0;

	constructor(protected game: Game, protected state: string = "base") { }

	abstract GetControlsData(): Record<string, Record<string, string>>;

	Init(useDefaults: boolean = true) {
		if (useDefaults) {
			this.game.Engine.InputManager.RegisterKeyListener("Escape", (e: KeyboardEvent) => this.OnEscKey(e));
			this.game.Engine.InputManager.RegisterKeyListener("m", (e: KeyboardEvent) => this.OnMKey(e));
			this.game.Engine.InputManager.RegisterNumKeyListener((num: number, e: KeyboardEvent) => this.OnNumKey(num, e));
			this.game.Engine.InputManager.RegisterDirKeyListener((dir: KeyDir, e: KeyboardEvent) => this.OnDirKey(dir, e));
		}
	}

	OnEscKey(event: KeyboardEvent) {
		this.state = "base";
	}

	OnMKey(event: KeyboardEvent) {
		switch (this.state) {
			case "base":
				this.state = "move";
				this.movePage = 0;
				this.moveViewNode = this.game.Player.Location;
				break;
		}
	}

	OnNumKey(num: number, event: KeyboardEvent) {
		num = num - 1;

		switch (this.state) {
			case "move":
				for (let i = 0; i < this.adjacentNodes.length; i++) {
					let node: Node = this.adjacentNodes[i - this.pageControlsIndex];

					if (i == num) {
						if ((this.moveViewNode as VirtualNode).NestedNode != null)
							this.moveViewNode = (this.moveViewNode as VirtualNode).NestedNode;
						else {
							let player = this.game.Player;
							let action = new MoveSelf(player, node);
							let distance: number;
							let edge = node.GetEdge(player.Location);

							if (edge != null)
								distance = edge.Distance;
							else {
								edge = player.Location.DirectParent.GetEdge(node);
								distance = player.Location.DirectParent.Distance + edge.Distance;
							}

							this.game.Player.QueueAction(action, player.MoveTime * distance);
						}
						return;
					}
				}
				break;
		}
	}

	OnDirKey(dir: KeyDir, event: KeyboardEvent) {
		switch (this.state) {
			case "move":
				switch (dir) {
					case "up":
						if (this.moveViewNode.DirectParent != null)
							this.moveViewNode = this.moveViewNode.DirectParent;
						break;
					case "down":
						if ((this.moveViewNode as VirtualNode).NestedNode != null)
							this.moveViewNode = (this.moveViewNode as VirtualNode).NestedNode;
						break;
					case "left":
						this.movePage--;

						if (this.movePage < 0)
							this.movePage = 0;
						break;
					case "right":
						this.movePage++;

						if (this.movePage + 1 > this.NumMovePages)
							this.movePage = this.NumMovePages - 1;
						break;
				}
				break;
		}
	}

	protected get adjacentNodes(): Node[] {
		return Array.from(this.moveViewNode.AdjacentNodes);
	}

	protected get pageControlsIndex(): number {
		return this.movePage * 10;
	}

	public get State(): string {
		return this.state;
	}

	public get MovePage(): number {
		return this.movePage + 1;
	}

	public get NumMovePages(): number {
		return Math.ceil(this.adjacentNodes.length / 10);
	}
}