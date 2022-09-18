// SPDX-FileCopyrightText: 2022 Christian Fletcher <mistrustfully@gmail.com>
//
// SPDX-License-Identifier: GPL-3.0-or-later

import { World } from "@rbxts/matter";
import { RunService } from "@rbxts/services";
import { MoveRunner } from "shared/components";

function RunMoves(world: World) {
	for (const [runnerId, { move, owner }] of world.query(MoveRunner)) {
		const destroy = move.onCooldown
			? false
			: RunService.IsServer()
			? move.onServer(owner, world)
			: move.onClient(owner, world);

		if (!destroy) {
			world.despawn(runnerId);
		}
	}
}

export = RunMoves;
