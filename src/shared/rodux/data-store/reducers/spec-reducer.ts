import Rodux from "@rbxts/rodux";
import { IPlayerData } from "shared/types/player-data";
import { Spec } from "shared/types/stands";

export interface SetSpecAction extends Rodux.Action<"SetSpecAction"> {
	spec: Spec;
}

export const SpecReducer = Rodux.createReducer<IPlayerData["spec"], SetSpecAction>(Spec.Specless, {
	SetSpecAction: (_, action) => {
		return action.spec;
	},
});
