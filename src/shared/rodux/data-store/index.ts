// SPDX-FileCopyrightText: 2022 Christian Fletcher <mistrustfully@gmail.com>
//
// SPDX-License-Identifier: GPL-3.0-or-later

import Rodux from "@rbxts/rodux";
import { RunService } from "@rbxts/services";
import Remotes from "shared/remotes";
import { IPlayerData } from "shared/types/player-data";
import { NetActionMiddleware } from "../middleware/net-action-middleware";
import { BanDataReducer } from "./reducers/ban-data-reducer";
import { InventoryActions, InventoryReducer } from "./reducers/inventory-reducer";
import { SpecReducer } from "./reducers/spec-reducer";
import { StandReducer, StandActions } from "./reducers/stand-reducer";
import { JoinDateReducer, PlaytimeReducer, TimeActions } from "./reducers/time-reducer";

export type DataStoreActions = InventoryActions | StandActions | TimeActions;

const reducer = Rodux.combineReducers<IPlayerData, DataStoreActions>({
	inventory: InventoryReducer,
	stand: StandReducer,
	spec: SpecReducer,
	playtime: PlaytimeReducer,
	join_date: JoinDateReducer,
	ban_data: BanDataReducer,
});

export function CreateDataRoduxStore(inital_state: IPlayerData, owner?: Player) {
	const middlwares = [];
	if (RunService.IsServer() && owner !== undefined) {
		const DataRoduxStoreChanged = Remotes.Server.Get("DataRoduxStoreChanged");
		middlwares.push(NetActionMiddleware<DataStoreActions>(owner, DataRoduxStoreChanged));
	}

	return new Rodux.Store<IPlayerData, DataStoreActions, {}>(reducer, inital_state, middlwares as never);
}

export type DataRoduxStore = Rodux.Store<IPlayerData, DataStoreActions>;
