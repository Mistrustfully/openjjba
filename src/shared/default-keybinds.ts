// SPDX-FileCopyrightText: 2022 Christian Fletcher <mistrustfully@gmail.com>
//
// SPDX-License-Identifier: GPL-3.0-or-later

import { Action, Union } from "@rbxts/gamejoy/out/Actions";

export const DefaultKeybinds = {
	Summon: new Union(["Q", new Action("ButtonR1")]),
	ToggleTarget: new Union(["MouseButton3", "DPadDown"]),
	Click: new Union([new Action("MouseButton1"), new Action("ButtonR2"), new Action("Touch")]),
};
