// SPDX-FileCopyrightText: 2022 Christian Fletcher <mistrustfully@gmail.com>
//
// SPDX-License-Identifier: GPL-3.0-or-later

import { AnyEntity, World } from "@rbxts/matter";
import { DefaultKeybinds } from "shared/default-keybinds";
import { Teleport } from "./teleport";

export const enum MoveReturnTypes {
	Failed, // Failed, don't retry, but don't set cooldown.
	Continue, //
	Destroy, //
}

/// moveFn will be ran repeatedly until it returns false
type moveFn = (this: Move, owner: AnyEntity, world: World, clientDone?: boolean) => boolean;
export interface Move {
	name: string;
	cooldown: number;
	onCooldown: boolean;

	keybind: keyof typeof DefaultKeybinds;

	onServer: moveFn;
	otherClients: moveFn;
	onClient: moveFn;
}

export const enum Moves {
	Summon,
	Barrage,
	Teleport,
}

const defaults: Move = {
	name: "DefaultMove",
	cooldown: 0,
	onCooldown: false,
	keybind: "Summon",

	onClient(this) {
		warn("OnClient not implemented for move " + this.name);
		return false;
	},

	otherClients(this) {
		warn("OtherClients not implemented for move " + this.name);
		return false;
	},

	onServer(this) {
		warn("OnServer not implemented for move " + this.name);
		return false;
	},
};

export const MoveData: { [index in Moves]: Partial<Move> } = {
	[Moves.Summon]: {
		name: "Summon",
		cooldown: 0.5,
		keybind: "Summon",
	},
	[Moves.Barrage]: {},
	[Moves.Teleport]: Teleport,
};

export function MergeMove(move: Moves, overrides: Partial<Move>) {
	return { ...defaults, ...MoveData[move], ...overrides };
}
