// SPDX-FileCopyrightText: 2022 Christian Fletcher <mistrustfully@gmail.com>
//
// SPDX-License-Identifier: GPL-3.0-or-later

import { Context } from "@rbxts/gamejoy";
import { ReplicatedStorage } from "@rbxts/services";
import { StandMoves } from "shared/combat/stand-moves";
import { DefaultKeybinds } from "shared/default-keybinds";
import Remotes from "shared/remotes";
import { CreateDataRoduxStore } from "shared/rodux/data-store";
import { CreateUIStore } from "shared/rodux/ui-store";
import { start } from "shared/start";
import { IClientState } from "shared/types/state";
import { CreateUI } from "./plugins/create-ui";
import { RecieveDatastoreChanges } from "./plugins/recieve-datastore-changes";
import { ReceiveReplication } from "./plugins/recieve-replication";

declare const script: { systems: Folder };
const GetInitialStoreValue = Remotes.Client.Get("GetDataRoduxStoreInitialData");
const PlayerData = GetInitialStoreValue.CallServer();

const state: IClientState = {
	debugEnabled: false,

	entityIdMap: new Map(),
	serverIdMap: new Map(),

	UIStore: CreateUIStore(),
	PlayerData: CreateDataRoduxStore(PlayerData),

	GamejoyContext: new Context({
		ActionGhosting: 1,
	}),
	InputActions: DefaultKeybinds,
};

start([script.systems, ReplicatedStorage.shared.systems], state)(ReceiveReplication, CreateUI, RecieveDatastoreChanges);
