// SPDX-FileCopyrightText: 2022 Christian Fletcher <mistrustfully@gmail.com>
//
// SPDX-License-Identifier: GPL-3.0-or-later

import { World } from "@rbxts/matter";
import { Workspace } from "@rbxts/services";
import { Hitbox, Renderable } from "shared/components";

function HitboxesCollide(world: World) {
	for (const [id, hitbox] of world.query(Hitbox)) {
		const overlapParams = new OverlapParams();
		overlapParams.FilterType = Enum.RaycastFilterType.Blacklist;

		const ownerModel = world.get(id, Renderable);
		if (ownerModel !== undefined) {
			overlapParams.FilterDescendantsInstances = [ownerModel.model];
		}

		const result =
			hitbox.type === "Radius"
				? Workspace.GetPartBoundsInRadius(hitbox.position, hitbox.size, overlapParams)
				: Workspace.GetPartBoundsInBox(hitbox.position, hitbox.size, overlapParams);

		const models: Model[] = [];
		result.forEach((v) => {
			const model = v.FindFirstAncestorOfClass("Model");

			if (model && model.FindFirstChildOfClass("Humanoid") && !models.includes(model)) {
				models.push(model);
			}
		});

		world.insert(
			id,
			hitbox.patch({
				currentHit: models,
			}),
		);
	}
}

export = HitboxesCollide;
