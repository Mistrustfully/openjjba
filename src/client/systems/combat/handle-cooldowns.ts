// SPDX-FileCopyrightText: 2022 Christian Fletcher <mistrustfully@gmail.com>
//
// SPDX-License-Identifier: GPL-3.0-or-later

import { useEvent, World } from "@rbxts/matter";
import { LocalPlayer, Moveset } from "shared/components";
import Remotes from "shared/remotes";

const CooldownEnded = Remotes.Client.Get("MoveCooldownEnded");
function HandleCooldowns(world: World) {
	for (const [_, moveIndex] of useEvent("CooldownEnded", CooldownEnded)) {
		const [_, moveset] = world.query(Moveset, LocalPlayer).next();
		const move = moveset.moveset[moveIndex];
		if (move) {
			move.onCooldown = false;
		}
	}
}

export = HandleCooldowns;
