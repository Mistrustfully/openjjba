// SPDX-FileCopyrightText: 2022 Christian Fletcher <mistrustfully@gmail.com>
//
// SPDX-License-Identifier: GPL-3.0-or-later

import Rodux from "@rbxts/rodux";
import { IItem } from "shared/types/items";
import { IPlayerData } from "shared/types/player-data";

export interface AddItemAction extends Rodux.Action<"AddItemAction"> {
	item: IItem;
}

export interface RemoveItemAction extends Rodux.Action<"RemoveItemAction"> {
	index: number;
}

export type InventoryActions = AddItemAction | RemoveItemAction;

export const InventoryReducer = Rodux.createReducer<IPlayerData["inventory"], InventoryActions>([], {
	AddItemAction: (state, action) => {
		return [...state, action.item];
	},

	RemoveItemAction: (state, action) => {
		const newState = [...state];
		newState.remove(action.index);

		return newState;
	},
});
