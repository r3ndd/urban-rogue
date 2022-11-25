export type KeyDir = "up" | "down" | "left" | "right";
export type KeyHandler = (event: KeyboardEvent) => void;
export type NumKeyHandler = (num: Number, event: KeyboardEvent) => void;
export type DirKeyHandler = (dir: KeyDir, event: KeyboardEvent) => void;

const dirKeys: string[] = ["ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight", "k", "j", "h", "l"];

export default class InputManager {
	private keyHandlers: Record<string, KeyHandler[]>;
	private numKeyHandlers: NumKeyHandler[];
	private dirKeyHandlers: DirKeyHandler[];

	constructor() {
		this.keyHandlers = {};
		this.numKeyHandlers = [];
		this.dirKeyHandlers = [];

		addEventListener("keydown", (event: KeyboardEvent) => {
			// Base handlers
			var handlers = this.keyHandlers[event.key];

			if (handlers == null)
				return;

			for (let handler of handlers)
				handler(event);

			// Number handlers
			var num = Number(event.key);

			if (!isNaN(num))
				for (let handler of this.numKeyHandlers)
					handler(num, event);

			// Direction handlers
			var dir = InputManager.KeyToDir(event.key);

			if (dir != null)
				for (let handler of this.dirKeyHandlers)
					handler(dir, event);
		});
	}

	RegisterKeyListener(key: string, handler: KeyHandler) {
		if (!this.keyHandlers[key])
			this.keyHandlers[key] = [];

		var handlers = this.keyHandlers[key];
		handlers.push(handler);
	}

	RegisterNumKeyListener(handler: NumKeyHandler) {
		this.numKeyHandlers.push(handler);
	}

	RegisterDirKeyListener(handler: DirKeyHandler) {
		this.dirKeyHandlers.push(handler);
	}

	static KeyToDir(key: string): KeyDir {
		switch (key) {
			case "ArrowUp":
			case "k":
				return "up";
			case "ArrowDown":
			case "j":
				return "down";
			case "ArrowLeft":
			case "h":
				return "left";
			case "ArrowRight":
			case "l":
				return "right";
		}
	}
}