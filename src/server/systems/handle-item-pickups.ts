// SPDX-FileCopyrightText: 2022 Christian Fletcher <mistrustfully@gmail.com>
//
// SPDX-License-Identifier: GPL-3.0-or-later

import { AnyEntity, useEvent, World } from "@rbxts/matter";
import { ItemComponent } from "shared/components";
import Remotes from "shared/remotes";
import { IServerState } from "shared/types/state";

const PickupItem = Remotes.Server.Get("PickupItem");

function HandleItemPickups(world: World, state: IServerState) {
	for (const [_, player, itemId] of useEvent("PickupItem", PickupItem)) {
		const entityId = tonumber(itemId) as AnyEntity;
		if (!world.contains(entityId)) return;

		const item = world.get(entityId, ItemComponent);

		if (item) {
			// TODO: Check if the player is near enough to pick the item up.
			const playerData = state.PlayerData.get(player);
			if (!playerData) return;

			playerData.dispatch({
				type: "AddItemAction",
				item: { item: item.id },
			});

			world.despawn(entityId);
		}
	}
}

export = HandleItemPickups;
