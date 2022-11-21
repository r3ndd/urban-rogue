type EventHandler = (event: KeyboardEvent) => void;

export default class InputManager {
	private listeners: Record<string, EventHandler[]>;

	constructor() {
		addEventListener("keydown", (event: KeyboardEvent) => {
			var handlers = this.listeners[event.key];

			if (handlers == null)
				return;

			for (let handler of handlers)
				handler(event);
		});
	}

	RegisterKeyListener(key: string, handler: EventHandler) {
		if (!this.listeners[key])
			this.listeners[key] = [];

		var handlers = this.listeners[key];
		handlers.push(handler);
	}
}