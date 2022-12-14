// SPDX-FileCopyrightText: 2022 Christian Fletcher <mistrustfully@gmail.com>
//
// SPDX-License-Identifier: GPL-3.0-or-later

import Net from "@rbxts/net";
import { AnyComponent } from "@rbxts/matter";
import { ComponentNames } from "shared/types/serde";
import { Stand } from "./types/stands";
import { IPlayerData } from "./types/player-data";
import { DataStoreActions } from "./rodux/data-store";

export type ComponentPayload = Map<string, Map<ComponentNames, { data: AnyComponent }>>;
const Remotes = Net.Definitions.Create({
	Replication: Net.Definitions.ServerToClientEvent<[ComponentPayload]>(),
	PickupItem: Net.Definitions.ClientToServerEvent<[string]>(),

	UseMove: Net.Definitions.ClientToServerEvent<[number]>(),
	EndMove: Net.Definitions.ClientToServerEvent<[number]>(),
	RecieveMove: Net.Definitions.ServerToClientEvent<[Stand, number]>(),

	MoveCooldownEnded: Net.Definitions.ServerToClientEvent<[number]>(),

	GetDataRoduxStoreInitialData: Net.Definitions.ServerFunction<() => IPlayerData>(),
	DataRoduxStoreChanged: Net.Definitions.ServerToClientEvent<[DataStoreActions]>(),
});

export default Remotes;
