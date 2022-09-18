// SPDX-FileCopyrightText: 2022 Christian Fletcher <mistrustfully@gmail.com>
//
// SPDX-License-Identifier: GPL-3.0-or-later

import { World } from "@rbxts/matter";
import { LocalPlayer, MoveRunner, Moveset } from "shared/components";
import { useGamejoyBind } from "shared/hooks/useGamejoy";
import { IClientState } from "shared/types/state";

function ProcessInputs(world: World, state: IClientState) {
	const [localentity, moveset, _] = world.query(Moveset, LocalPlayer).next();
	if (localentity === undefined || moveset === undefined) return;

	moveset.moveset.forEach((move) => {
		for (const [_] of useGamejoyBind(state.GamejoyContext, state.InputActions[move.keybind])) {
			print(move.name);
			world.spawn(
				MoveRunner({
					owner: localentity,
					move: move,
				}),
			);
		}
	});
}

export = ProcessInputs;
