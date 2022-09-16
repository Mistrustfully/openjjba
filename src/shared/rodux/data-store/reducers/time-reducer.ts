import Rodux from "@rbxts/rodux";
import { IPlayerData } from "shared/types/player-data";

export interface IncrementPlaytimeAction extends Rodux.Action<"IncrementPlaytimeAction"> {}
export const PlaytimeReducer = Rodux.createReducer<IPlayerData["playtime"], IncrementPlaytimeAction>(0, {
	IncrementPlaytimeAction: (state) => {
		return state + 1;
	},
});

export interface SetJoinDateAction extends Rodux.Action<"SetJoinDateAction"> {
	date: number;
}
export const JoinDateReducer = Rodux.createReducer<IPlayerData["join_date"], SetJoinDateAction>(os.time(), {
	SetJoinDateAction: (_, action) => {
		return action.date;
	},
});

export type TimeActions = SetJoinDateAction | IncrementPlaytimeAction;
