// SPDX-FileCopyrightText: 2022 Christian Fletcher <mistrustfully@gmail.com>
//
// SPDX-License-Identifier: GPL-3.0-or-later

import { AnyEntity } from "@rbxts/matter";
import { DataRoduxStore } from "shared/rodux/data-store";
import { UIStore } from "shared/rodux/ui-store";
import { Context } from "@rbxts/gamejoy/";
import { ContextOptions } from "@rbxts/gamejoy/out/Definitions/Types";
import { DefaultKeybinds } from "shared/default-keybinds";
import { Move } from "shared/combat/moves";

export interface IClientState {
	debugEnabled: boolean;

	entityIdMap: Map<string, AnyEntity>;
	serverIdMap: Map<AnyEntity, string>;

	UIStore: UIStore;
	PlayerData: DataRoduxStore;

	GamejoyContext: Context<ContextOptions>;
	InputActions: typeof DefaultKeybinds;

	Moveset: Move[];
}

export interface IServerState {
	PlayerData: Map<Player, DataRoduxStore>;
}
