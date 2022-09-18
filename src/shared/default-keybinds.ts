// SPDX-FileCopyrightText: 2022 Christian Fletcher <mistrustfully@gmail.com>
//
// SPDX-License-Identifier: GPL-3.0-or-later

import { Action, Sequence, Union } from "@rbxts/gamejoy/out/Actions";
import { AxisAction } from "@rbxts/gamejoy/out/Actions/AxisAction";

export const DefaultKeybinds = {
	Summon: new Union(["Q", new Action("ButtonR1")]),
	Dash: new Union(["C", "ButtonB"]),

	ToggleTarget: new Union(["MouseButton3", "DPadDown"]),
	Click: new Union([new Action("MouseButton1"), new Action("ButtonR2"), new Action("Touch")]),
};
