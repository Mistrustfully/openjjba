// SPDX-FileCopyrightText: 2022 Christian Fletcher <mistrustfully@gmail.com>
//
// SPDX-License-Identifier: GPL-3.0-or-later

import { useThrottle, World } from "@rbxts/matter";
import { IServerState } from "shared/types/state";

function IncrementPlaytime(_: World, state: IServerState) {
	state.PlayerData.forEach((dataStore, player) => {
		if (useThrottle(1, player)) {
			dataStore.dispatch({
				type: "IncrementPlaytimeAction",
			});
		}
	});
}

export = IncrementPlaytime;
