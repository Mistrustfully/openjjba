// SPDX-FileCopyrightText: 2022 Christian Fletcher <mistrustfully@gmail.com>
//
// SPDX-License-Identifier: GPL-3.0-or-later

import Rodux from "@rbxts/rodux";
import { IUIStore } from ".";

export interface SetPlayingMusic extends Rodux.Action<"SetPlayingMusic"> {
	name: string;
	artist: string;
}

export const MusicReducer = Rodux.createReducer<IUIStore["Music"], SetPlayingMusic>(
	{ name: "null", artist: "null" },
	{
		SetPlayingMusic: (_state, action) => {
			return { ...action };
		},
	},
);
