import type Game from "./Game";

export default abstract class ControlsManager {
	constructor(protected game: Game, protected state: string) { }

	abstract GetControlsData(): Record<string, string>;
}