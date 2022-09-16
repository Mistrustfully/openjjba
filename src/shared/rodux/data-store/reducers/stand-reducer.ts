import Rodux from "@rbxts/rodux";
import { IPlayerData } from "shared/types/player-data";
import { IStand, IStandExtraData, Stand } from "shared/types/stands";

export interface SetStandAction extends Rodux.Action<"SetStandAction"> {
	stand: IStand;
}

export interface ClearStandAction extends Rodux.Action<"ClearStandAction"> {}

export interface SetExtraStandDataAction extends Rodux.Action<"SetExtraStandDataAction"> {
	extra_data?: IStandExtraData;
}

export function SetExtraStandData(extra_data?: IStandExtraData): SetExtraStandDataAction {
	return {
		type: "SetExtraStandDataAction",
		extra_data,
	};
}

export type StandActions = SetStandAction | ClearStandAction | SetExtraStandDataAction;

export const StandReducer = Rodux.createReducer<IPlayerData["stand"], StandActions>(
	{
		id: Stand.Standless,
	},
	{
		SetStandAction: (_state, action) => {
			return action.stand;
		},

		ClearStandAction: () => {
			return {
				id: Stand.Standless,
			};
		},

		SetExtraStandDataAction: (state, action) => {
			return { ...state, extra_data: action.extra_data };
		},
	},
);
