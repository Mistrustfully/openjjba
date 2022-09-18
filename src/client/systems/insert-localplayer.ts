// SPDX-FileCopyrightText: 2022 Christian Fletcher <mistrustfully@gmail.com>
//
// SPDX-License-Identifier: GPL-3.0-or-later

import { World } from "@rbxts/matter";
import { Players } from "@rbxts/services";
import { LocalPlayer, PlayerLike, Renderable } from "shared/components";

function InsertLocalPlayer(world: World) {
	for (const [entityId] of world.queryChanged(PlayerLike)) {
		if (!world.contains(entityId)) continue;
		const renderable = world.get(entityId, Renderable);
		if (!renderable) continue;

		if (Players.LocalPlayer.Character === renderable.model) {
			world.insert(entityId, LocalPlayer());
		}
	}
}

export = InsertLocalPlayer;
