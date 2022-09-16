// SPDX-FileCopyrightText: 2022 Christian Fletcher <mistrustfully@gmail.com>
//
// SPDX-License-Identifier: GPL-3.0-or-later

import { AnyEntity } from "@rbxts/matter";
import { DataRoduxStore } from "shared/rodux/data-store";
import { UIStore } from "shared/rodux/ui-store";

export interface IClientState {
	debugEnabled: boolean;

	entityIdMap: Map<string, AnyEntity>;
	serverIdMap: Map<AnyEntity, string>;

	UIStore: UIStore;
	PlayerData: DataRoduxStore;
}

export interface IServerState {
	PlayerData: Map<Player, DataRoduxStore>;
}
