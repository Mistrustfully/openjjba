import { useEvent, World } from "@rbxts/matter";
import { UserInputService } from "@rbxts/services";
import { Hovered, ItemComponent } from "shared/components";
import Remotes from "shared/remotes";
import { IClientState } from "shared/types/state";

const PickupItemRemote = Remotes.Client.Get("PickupItem");
function PickupItem(world: World, state: IClientState) {
	for (const [_, inputevent] of useEvent(UserInputService, "InputBegan")) {
		if (inputevent.UserInputType === Enum.UserInputType.MouseButton1) {
			const [id, hoveredModel] = world.query(Hovered).next();
			if (!hoveredModel || id === undefined) return;
			const itemComponent = world.get(id, ItemComponent);
			if (!itemComponent) return;

			const serverId = state.serverIdMap.get(id);
			if (serverId !== undefined) {
				PickupItemRemote.SendToServer(serverId);
			}
		}
	}
}

export = PickupItem;
