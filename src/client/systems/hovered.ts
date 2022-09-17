import { AnyComponent, AnyEntity, useEvent, World } from "@rbxts/matter";
import { Players, UserInputService } from "@rbxts/services";
import { Hovered } from "shared/components";
import { IClientState } from "shared/types/state";

// Apply "Hovered" component on hovered Renderable entities.
function ApplyHovered(world: World, state: IClientState) {
	const [oldId]: [AnyEntity, AnyComponent] = world.query(Hovered).next();

	const hitObject = Players.LocalPlayer.GetMouse().Target;
	const hitModel = hitObject?.FindFirstAncestorOfClass("Model");
	const entityId = tonumber(hitModel?.GetAttribute("c_id"));
	if (!hitObject || !hitModel || entityId === undefined || !world.contains(entityId as AnyEntity)) {
		if (world.contains(oldId)) {
			world.remove(oldId, Hovered);
		}

		return;
	}

	if (oldId !== entityId && world.contains(oldId)) {
		world.remove(oldId, Hovered);
	}

	world.insert(entityId as AnyEntity, Hovered());
}

export = ApplyHovered;
