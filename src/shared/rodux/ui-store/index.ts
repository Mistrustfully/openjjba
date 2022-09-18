// SPDX-FileCopyrightText: 2022 Christian Fletcher <mistrustfully@gmail.com>
//
// SPDX-License-Identifier: GPL-3.0-or-later

import Rodux from "@rbxts/rodux";
import { PickupReducer, UpdatePickupUIAction } from "./pickup-reducer";
import { LockOnReducer, SetTargetAction } from "./lock-on-reducer";
import { MusicReducer, SetPlayingMusic } from "./music-reducer";

export interface IUIStore {
	Pickup: {
		HoveredName: string;
		MousePosition: UDim2;
		Visible: boolean;
	};

	LockOn: {
		Target?: Model;
	};

	Music: {
		name: string;
		artist: string;
	};
}

type StoreActions = UpdatePickupUIAction | SetTargetAction | SetPlayingMusic;

const reducer = Rodux.combineReducers<IUIStore, StoreActions>({
	Pickup: PickupReducer,
	LockOn: LockOnReducer,
	Music: MusicReducer,
});

export function CreateUIStore() {
	return new Rodux.Store<IUIStore, StoreActions, {}>(reducer, undefined /*[Rodux.loggerMiddleware]*/);
}

export type UIStore = Rodux.Store<IUIStore, StoreActions>;
