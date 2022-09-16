// SPDX-FileCopyrightText: 2022 Christian Fletcher <mistrustfully@gmail.com>
//
// SPDX-License-Identifier: GPL-3.0-or-later

import { World } from "@rbxts/matter";
import { RunService } from "@rbxts/services";
import { Renderable } from "shared/components";

function SetEntityAttributes(world: World) {
	for (const [id, model] of world.queryChanged(Renderable)) {
		if (model.new) {
			model.new.model.SetAttribute(RunService.IsServer() ? "id" : "c_id", id);
			if (model.old) {
				model.old.model.SetAttribute("id", undefined);
			}
		}
	}
}

export = SetEntityAttributes;
