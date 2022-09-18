// SPDX-FileCopyrightText: 2022 Christian Fletcher <mistrustfully@gmail.com>
//
// SPDX-License-Identifier: GPL-3.0-or-later

import { Workspace } from "@rbxts/services";
import { Renderable } from "shared/components";
import { Move } from ".";

export const Teleport: Partial<Move> = {
	name: "Teleport",
	cooldown: 2,
	keybind: "Dash",

	onClient(this, owner, world) {
		const character = world.get(owner, Renderable);
		const humanoid = character?.model.FindFirstChildOfClass("Humanoid");
		const humanoidRootPart = character?.model.PrimaryPart;
		const camera = Workspace.CurrentCamera;

		if (
			!(
				character !== undefined &&
				humanoid !== undefined &&
				humanoidRootPart !== undefined &&
				humanoidRootPart.IsA("BasePart") &&
				camera !== undefined
			)
		)
			return false;

		const cameraLookDirection = camera.CFrame.LookVector.mul(new Vector3(1, 0, 1)).Unit;
		const cameraRelativeCFrame = CFrame.lookAt(Vector3.zero, cameraLookDirection);
		const moveVector = cameraRelativeCFrame.VectorToObjectSpace(humanoid.MoveDirection).Unit.mul(12);

		const raycastParams = new RaycastParams();
		raycastParams.FilterType = Enum.RaycastFilterType.Blacklist;
		raycastParams.FilterDescendantsInstances = [character.model];

		const direction = (
			humanoid.MoveDirection.Magnitude > 0 ? humanoid.MoveDirection : humanoidRootPart.CFrame.LookVector
		).mul(12);

		const raycastResult = Workspace.Raycast(
			humanoidRootPart.Position,
			humanoidRootPart.CFrame.LookVector.add(moveVector),
			raycastParams,
		);

		let cf = humanoidRootPart.CFrame.add(direction);
		if (raycastResult) {
			cf = CFrame.lookAt(raycastResult.Position, raycastResult.Position.add(humanoidRootPart.CFrame.LookVector));
		}

		humanoidRootPart.CFrame = cf;

		return false;
	},
};
