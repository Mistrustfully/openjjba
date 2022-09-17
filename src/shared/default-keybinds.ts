import { Action, Union } from "@rbxts/gamejoy/out/Actions";

export const DefaultKeybinds = {
	Summon: new Union(["Q", new Action("ButtonR1")]),
	ToggleTarget: new Union(["MouseButton3", "DPadDown"]),
	Click: new Union([new Action("MouseButton1"), new Action("ButtonR2"), new Action("Touch")]),
};
