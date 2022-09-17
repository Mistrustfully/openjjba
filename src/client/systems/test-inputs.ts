import { Context } from "@rbxts/gamejoy";
import { Action, Sequence } from "@rbxts/gamejoy/out/Actions";
import { World } from "@rbxts/matter";
import { useGamejoyBind } from "shared/hooks/useGamejoy";

const ctx = new Context({});
const atn = new Sequence(["Q", "E"]);

function a(world: World) {
	for (const [_] of useGamejoyBind(ctx, atn)) {
		print("used q");
	}
}

export = a;
