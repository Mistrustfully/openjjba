// SPDX-FileCopyrightText: 2022 Christian Fletcher <mistrustfully@gmail.com>
//
// SPDX-License-Identifier: GPL-3.0-or-later

import { AnyEntity, useEvent, World } from "@rbxts/matter";
import { Players, UserInputService } from "@rbxts/services";
import { ItemComponent, LocalPlayerComponent, Renderable } from "shared/components";
import Remotes from "shared/remotes";
import { UpdatePickupUI } from "shared/rodux/ui-store/pickup-reducer";
import { Item, ItemToName } from "shared/types/items";
import { IClientState } from "shared/types/state";

const PickupItem = Remotes.Client.Get("PickupItem");

let cachedItem: [AnyEntity, Item] | undefined;
let mousePosition: UDim2 = UDim2.fromScale(0.5, 0.5);

function PickUpItems(world: World, state: IClientState) {
	for (const [_, inputevent] of useEvent(UserInputService, "InputBegan")) {
		if (inputevent.UserInputType === Enum.UserInputType.MouseButton1) {
			if (cachedItem === undefined) break;
			if (world.contains(cachedItem[0])) {
				const serverId = state.serverIdMap.get(cachedItem[0]);
				if (serverId !== undefined) {
					PickupItem.SendToServer(serverId);
				}
			}
		}
	}

	for (const [_, inputevent] of useEvent(UserInputService, "InputChanged")) {
		cachedItem = undefined;

		if (inputevent.UserInputType !== Enum.UserInputType.MouseMovement) continue;
		mousePosition = UDim2.fromOffset(inputevent.Position.X, inputevent.Position.Y);

		const hitObject = Players.LocalPlayer.GetMouse().Target;
		if (hitObject === undefined) break;

		const hitModel = hitObject.FindFirstAncestorOfClass("Model");
		if (hitModel === undefined) break;

		const entityId = tonumber(hitModel.GetAttribute("c_id"));
		if (entityId === undefined) break;

		const item = world.get(entityId as AnyEntity, ItemComponent);
		if (item === undefined) break;

		cachedItem = [entityId as AnyEntity, item.id];
	}

	if (cachedItem) {
		if (!world.contains(cachedItem[0])) {
			cachedItem = undefined;
		}
	}

	const itemName = cachedItem ? ItemToName[cachedItem[1]] : undefined;
	state.UIStore.dispatch(
		UpdatePickupUI({
			HoveredName: itemName,
			MousePosition: mousePosition,
			Visible: itemName !== undefined ? true : false,
		}),
	);
}

export = { system: PickUpItems, event: "render" };
