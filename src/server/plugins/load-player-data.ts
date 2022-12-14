// SPDX-FileCopyrightText: 2022 Christian Fletcher <mistrustfully@gmail.com>
//
// SPDX-License-Identifier: GPL-3.0-or-later

import { World } from "@rbxts/matter";
import ProfileService from "@rbxts/profileservice";
import { Players } from "@rbxts/services";
import Remotes from "shared/remotes";
import { CreateDataRoduxStore } from "shared/rodux/data-store";
import { DefaultPlayerData, IPlayerData } from "shared/types/player-data";
import { IServerState } from "shared/types/state";

const ProfileStore = ProfileService.GetProfileStore("v.2-b", DefaultPlayerData);
const GetDataStoreInitialState = Remotes.Server.Get("GetDataRoduxStoreInitialData");

export function LoadPlayerData(_: World, state: IServerState) {
	function PlayerAdded(player: Player) {
		const profile = ProfileStore.LoadProfileAsync(`Player_${player.UserId}`);
		if (profile) {
			profile.AddUserId(player.UserId);
			profile.Reconcile();

			if (player.IsDescendantOf(Players)) {
				InitPlayerData(player, profile.Data);
				state.PlayerData.set(player, CreateDataRoduxStore(profile.Data, player));
			} else {
				UnloadPlayerData(state, player, true);
			}

			profile.ListenToRelease(() => {
				UnloadPlayerData(state, player, true);
			});
		}
	}

	function PlayerRemoving(player: Player) {
		UnloadPlayerData(state, player);
	}

	Players.GetPlayers().forEach((player) => {
		PlayerAdded(player);
	});

	Players.PlayerAdded.Connect(PlayerAdded);
	Players.PlayerRemoving.Connect(PlayerRemoving);

	GetDataStoreInitialState.SetCallback((player) => {
		return state.PlayerData.get(player)!.getState();
	});
}

function UnloadPlayerData(state: IServerState, player: Player, force?: boolean) {
	state.PlayerData.delete(player);

	if (force) {
		player.Kick();
	}
}

function InitPlayerData(player: Player, data: IPlayerData) {
	const current_time = os.time();
	if (data.join_date === 0) {
		data.join_date = current_time;
	}

	if (data.ban_data) {
		const unban_date = data.ban_data.unban_date;

		if (unban_date !== 0) {
			if (unban_date > current_time) {
				const dt = DateTime.fromUnixTimestamp(unban_date);
				const formatted_date = dt.FormatLocalTime("LLLL", player.LocaleId);
				player.Kick(
					`You are currently banned! Reason: ${data.ban_data.reason}. You will be unbanned after ${formatted_date}.`,
				);
			} else {
				data.ban_data.ban_history.push({
					unban_date: data.ban_data.unban_date,
					reason: data.ban_data.reason,
				});

				data.ban_data.reason = "";
				data.ban_data.unban_date = 0;
			}
		}
	}
}
