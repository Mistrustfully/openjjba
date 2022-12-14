// SPDX-FileCopyrightText: 2022 Christian Fletcher <mistrustfully@gmail.com>
//
// SPDX-License-Identifier: GPL-3.0-or-later

import { World } from "@rbxts/matter";
import Remotes from "shared/remotes";
import { IClientState } from "shared/types/state";

const DataRoduxStoreChanged = Remotes.Client.Get("DataRoduxStoreChanged");
export function RecieveDatastoreChanges(_: World, state: IClientState) {
	DataRoduxStoreChanged.Connect((action) => {
		state.PlayerData.dispatch(action);
	});
}
