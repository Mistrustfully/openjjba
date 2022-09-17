import { Context } from "@rbxts/gamejoy";
import { Action, Sequence } from "@rbxts/gamejoy/out/Actions";
import { World } from "@rbxts/matter";
import { useGamejoyBind } from "shared/hooks/useGamejoy";
import { IClientState } from "shared/types/state";

function a(world: World, state: IClientState) {
	for (const [i] of useGamejoyBind(state.GamejoyContext, state.InputActions.Summon)) {
		print(state.InputActions.Summon);
	}
}

export = a;
