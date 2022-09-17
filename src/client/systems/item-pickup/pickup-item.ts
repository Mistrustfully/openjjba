// SPDX-FileCopyrightText: 2022 Christian Fletcher <mistrustfully@gmail.com>
//
// SPDX-License-Identifier: GPL-3.0-or-later

import { World } from "@rbxts/matter";
import { Hovered, ItemComponent } from "shared/components";
import { useGamejoyBind } from "shared/hooks/useGamejoy";
import Remotes from "shared/remotes";
import { IClientState } from "shared/types/state";

const PickupItemRemote = Remotes.Client.Get("PickupItem");
function PickupItem(world: World, state: IClientState) {
	for (const [_] of useGamejoyBind(state.GamejoyContext, state.InputActions.Click)) {
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

export = PickupItem;
