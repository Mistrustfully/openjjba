// SPDX-FileCopyrightText: 2022 Christian Fletcher <mistrustfully@gmail.com>
//
// SPDX-License-Identifier: GPL-3.0-or-later

import Rodux from "@rbxts/rodux";
import { IPlayerData } from "shared/types/player-data";

interface BanAction extends Rodux.Action<"BanAction"> {
	unban_date: number;
	reason: string;
}

interface UnbanAction extends Rodux.Action<"UnbanAction"> {}

export type BanActions = BanAction | UnbanAction;

function ExtractBanData(data: Required<IPlayerData>["ban_data"]) {
	return {
		unban_date: data.unban_date,
		reason: data.reason,
	};
}

export const BanDataReducer = Rodux.createReducer<IPlayerData["ban_data"], BanActions>(
	{
		unban_date: 0,
		reason: "",
		ban_history: [],
	},
	{
		BanAction: (state, action) => {
			return { ...state, reason: action.reason, unban_date: action.unban_date };
		},

		UnbanAction: (state) => {
			const newState = { ...state };
			newState.ban_history.push(ExtractBanData(newState));

			newState.reason = "";
			newState.unban_date = 0;

			return newState;
		},
	},
);
