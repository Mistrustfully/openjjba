// SPDX-FileCopyrightText: 2022 Christian Fletcher <mistrustfully@gmail.com>
//
// SPDX-License-Identifier: GPL-3.0-or-later

import { World } from "@rbxts/matter";
import { useGamejoyBind } from "shared/hooks/useGamejoy";
import { IClientState } from "shared/types/state";

function ProcessInputs(world: World, state: IClientState) {
	for (const move of state.Moveset) {
		for (const [_] of useGamejoyBind(state.GamejoyContext, state.InputActions[move.keybind])) {
			print("Move used!", move.keybind);
		}
	}
}

export = ProcessInputs;
