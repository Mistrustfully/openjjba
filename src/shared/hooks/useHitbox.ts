// SPDX-FileCopyrightText: 2022 Christian Fletcher <mistrustfully@gmail.com>
//
// SPDX-License-Identifier: MIT

import { AnyEntity } from "@rbxts/matter";
import { RunService, Workspace } from "@rbxts/services";

type HitboxParams = (
	| {
			type: "Box";
			position: CFrame;
			size: Vector3;
	  }
	| {
			type: "Sphere";
			position: Vector3;
			size: number;
	  }
) & {
	filter?: Instance[];
};

export function useHitbox(hitboxParams: HitboxParams): AnyEntity[] {
	const overlapParams = new OverlapParams();
	overlapParams.FilterType = Enum.RaycastFilterType.Blacklist;
	overlapParams.FilterDescendantsInstances = hitboxParams.filter || [];

	const result =
		hitboxParams.type === "Sphere"
			? Workspace.GetPartBoundsInRadius(hitboxParams.position, hitboxParams.size, overlapParams)
			: Workspace.GetPartBoundsInBox(hitboxParams.position, hitboxParams.size, overlapParams);

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

	return models;
}
