// SPDX-FileCopyrightText: 2022 Christian Fletcher <mistrustfully@gmail.com>
//
// SPDX-License-Identifier: GPL-3.0-or-later

import { World } from "@rbxts/matter";
import { Players } from "@rbxts/services";
import { Hitbox, LocalPlayerComponent, PlayerComponent } from "shared/components";

function InsertLocalPlayerComponent(world: World) {
	for (const [id, player] of world.queryChanged(PlayerComponent)) {
		if (player.new) {
			if (player.new.player === Players.LocalPlayer) {
				world.insert(
					id,
					LocalPlayerComponent({ localplayer: Players.LocalPlayer }),
					Hitbox({
						type: "Hitbox",
						size: new Vector3(3, 3, 3),
						position: new CFrame(3, 3, 3),
						currentHit: [],
					}),
				);
			}
		}
	}
}

export = InsertLocalPlayerComponent;
