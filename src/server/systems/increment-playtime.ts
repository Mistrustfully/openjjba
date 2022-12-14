// SPDX-FileCopyrightText: 2022 Christian Fletcher <mistrustfully@gmail.com>
//
// SPDX-License-Identifier: GPL-3.0-or-later

import { useThrottle, World } from "@rbxts/matter";
import { PlayerData } from "shared/components";

function IncrementPlaytime(world: World) {
	for (const [id, data] of world.query(PlayerData)) {
		if (useThrottle(1, id) && data.playtime !== undefined) {
			world.insert(id, data.patch({ playtime: data.playtime + 1 }));
		}
	}
}

export = IncrementPlaytime;
