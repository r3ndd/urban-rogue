type KeyHandler = (event: KeyboardEvent) => void;
type NumKeyHandler = (num: Number, event: KeyboardEvent) => void;

export default class InputManager {
	private keyListeners: Record<string, KeyHandler[]>;
	private numKeyListeners: NumKeyHandler[];

	constructor() {
		this.keyListeners = {};
		this.numKeyListeners = [];

		addEventListener("keydown", (event: KeyboardEvent) => {
			var handlers = this.keyListeners[event.key];

			if (handlers == null)
				return;

			for (let handler of handlers)
				handler(event);

			var num = Number(event.key);

			if (isNaN(num))
				return;

			for (let handler of this.numKeyListeners)
				handler(num, event);
		});
	}

	RegisterKeyListener(key: string, handler: KeyHandler) {
		if (!this.keyListeners[key])
			this.keyListeners[key] = [];

		var handlers = this.keyListeners[key];
		handlers.push(handler);
	}

	RegisterNumKeyListener(handler: NumKeyHandler) {
		this.numKeyListeners.push(handler);
	}
}