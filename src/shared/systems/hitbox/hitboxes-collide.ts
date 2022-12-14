// SPDX-FileCopyrightText: 2022 Christian Fletcher <mistrustfully@gmail.com>
//
// SPDX-License-Identifier: GPL-3.0-or-later

import { AnyEntity, World } from "@rbxts/matter";
import { RunService, Workspace } from "@rbxts/services";
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

		const models: AnyEntity[] = [];
		result.forEach((v) => {
			const model = v.FindFirstAncestorOfClass("Model");

			if (model && model.FindFirstChildOfClass("Humanoid")) {
				const id = model.GetAttribute(RunService.IsServer() ? "id" : "c_id") as AnyEntity | undefined;
				if (id !== undefined && !models.includes(id)) {
					models.push(id);
				}
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
