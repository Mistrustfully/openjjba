// SPDX-FileCopyrightText: 2022 Ukendio
//
// SPDX-License-Identifier: MIT

/// https://github.com/Ukendio/for-animia/blob/master/src/shared/systems/removingMissingModels.ts

import { useEvent, World } from "@rbxts/matter";
import { Renderable } from "shared/components";

function RemoveMissingModels(world: World) {
	for (const [id, { model }] of world.query(Renderable)) {
		for (const [_] of useEvent(model, "AncestryChanged")) {
			if (model.IsDescendantOf(game) === false) {
				world.despawn(id);
				return;
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
