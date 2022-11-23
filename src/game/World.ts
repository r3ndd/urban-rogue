import Player from "../engine/entity/Player";
import { GroundNode, Flags_OpenPath, VirtualNode, Flags_ObscuredPath, Flags_Window } from "../engine/world/Node";
import World from "../engine/world/World";
import UrbanRoguePlayer from "./Player";

export default class UrbanRogueWorld extends World {
	Generate() {
		// Instantiate nodes
		this.root = new VirtualNode("Basic House", "A basic house");
		var driveway = new GroundNode("Driveway", "The driveway for the house", this.root);
		var frontDoor = new GroundNode("Front Door", "The front door of the house", this.root);
		var backDoor = new GroundNode("Back Door", "The back door of the house", this.root);
		var window = new GroundNode("Window", "The window of the house", this.root);
		var entranceHallway = new GroundNode("Entrance Hallway", "A hallway at the entrance of the house", this.root);
		var kitchen = new GroundNode("Kitchen", "The kitchen of the house", this.root);
		var livingRoom = new GroundNode("Living Room", "The living room of the house", this.root);
		var backHallway = new GroundNode("Back Hallway", "A hallway at the back of the house", this.root);
		var bedroom = new GroundNode("Bedroom", "The bedroom of the house", this.root);

		// Instantiate entities
		this.player = new UrbanRoguePlayer(this.game, driveway);

		// Create edges
		this.root.NestedNode = driveway;

		driveway.Connect(frontDoor, Flags_OpenPath);
		driveway.Connect(backDoor, Flags_ObscuredPath);
		driveway.Connect(window, Flags_ObscuredPath);

		frontDoor.Connect(backDoor, Flags_ObscuredPath);
		frontDoor.Connect(window, Flags_ObscuredPath);
		frontDoor.Connect(entranceHallway, Flags_OpenPath);

		backDoor.Connect(window, Flags_ObscuredPath);
		backDoor.Connect(backHallway, Flags_OpenPath);

		window.Connect(livingRoom, Flags_Window);

		entranceHallway.Connect(kitchen, Flags_ObscuredPath);
		entranceHallway.Connect(livingRoom, Flags_OpenPath);

		kitchen.Connect(livingRoom, Flags_ObscuredPath);

		livingRoom.Connect(bedroom, Flags_OpenPath);
	}
}