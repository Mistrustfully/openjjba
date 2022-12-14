// SPDX-FileCopyrightText: 2022 Christian Fletcher <mistrustfully@gmail.com>
//
// SPDX-License-Identifier: GPL-3.0-or-later

import { useEvent, World } from "@rbxts/matter";
import { Renderable } from "shared/components";

function RemoveMissingModels(world: World) {
	for (const [id, { model }] of world.query(Renderable)) {
		for (const [_] of useEvent(model, "AncestryChanged")) {
			if (model.IsDescendantOf(game) === false) {
				world.remove(id, Renderable);
				break;
			}
		}

		if (!model.PrimaryPart) {
			world.remove(id, Renderable);
		}
	}

	for (const [, modelRecord] of world.queryChanged(Renderable)) {
		if (modelRecord.new === undefined) {
			if (modelRecord.old && modelRecord.old.model) {
				modelRecord.old.model.Destroy();
			}
		}
	}
}

export = RemoveMissingModels;
