// SPDX-FileCopyrightText: 2022 Christian Fletcher <mistrustfully@gmail.com>
//
// SPDX-License-Identifier: GPL-3.0-or-later

import { World } from "@rbxts/matter";
import { DefaultKeybinds } from "shared/default-keybinds";

export interface Move {
	name: string;
	cooldown: number;
	onCooldown: boolean;

	keybind: keyof typeof DefaultKeybinds;

	onServer: (this: Move, world: World) => void;
	otherClients: (this: Move, world: World) => void;
	onClient: (this: Move, world: World) => void;
}

export const enum Moves {
	Summon,
	Barrage,
}

const defaults: Move = {
	name: "DefaultMove",
	cooldown: 0,
	onCooldown: false,
	keybind: "Summon",

	onClient(this) {
		warn("OnClient not implemented for move " + this.name);
	},

	otherClients(this) {
		warn("OtherClients not implemented for move " + this.name);
	},

	onServer(this) {
		warn("OnServer not implemented for move " + this.name);
	},
};

export const MoveData: { [index in Moves]: Partial<Move> } = {
	[Moves.Summon]: {
		name: "Summon",
		cooldown: 0.5,
		keybind: "Summon",
	},

	[Moves.Barrage]: {},
};

export function MergeMove(move: Moves, overrides: Partial<Move>) {
	return { ...defaults, ...MoveData[move], ...overrides };
}
