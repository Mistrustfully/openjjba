// SPDX-FileCopyrightText: 2022 Christian Fletcher <mistrustfully@gmail.com>
//
// SPDX-License-Identifier: GPL-3.0-or-later

import { AnyEntity, useEvent, useThrottle, World } from "@rbxts/matter";
import { Players, UserInputService, Workspace } from "@rbxts/services";
import { Renderable, Targetable, Targeted } from "shared/components";
import { useGamejoyBind } from "shared/hooks/useGamejoy";
import { SetTarget } from "shared/rodux/ui-store/lock-on-reducer";
import { IClientState } from "shared/types/state";

function IsCharacterVisible(character: Model): [boolean, Vector3] {
	const humanoidRootPart = character.FindFirstChild("HumanoidRootPart");
	if (humanoidRootPart === undefined || !humanoidRootPart.IsA("BasePart")) return [false, undefined!];

	const camera = Workspace.CurrentCamera!;
	const [vector, inViewport] = camera.WorldToViewportPoint(humanoidRootPart.Position);

	const onScreen = inViewport && vector.Z > 0;
	if (!onScreen) {
		return [false, vector];
	}

	const ray = camera.ViewportPointToRay(vector.X, vector.Y);

	const raycastParams = new RaycastParams();
	raycastParams.FilterType = Enum.RaycastFilterType.Blacklist;
	raycastParams.FilterDescendantsInstances = [Players.LocalPlayer.Character!];

	const raycastResult = Workspace.Raycast(ray.Origin, ray.Direction.mul(1000), raycastParams);
	if (raycastResult) {
		if (raycastResult.Instance.IsDescendantOf(character)) {
			return [true, vector];
		}
	}

	return [false, vector];
}

function LockOn(world: World, state: IClientState) {
	for (const [_] of useGamejoyBind(state.GamejoyContext, state.InputActions.ToggleTarget)) {
		const [targetedEntity] = world.query(Targeted).next();
		if (targetedEntity !== undefined) {
			world.remove(targetedEntity, Targeted);
			state.UIStore.dispatch(SetTarget());
			return;
		}

		const visibleTargets: [AnyEntity, Model, Vector2][] = [];
		for (const [id, char] of world.query(Renderable, Targetable).without(Targeted)) {
			const [visible, vector] = IsCharacterVisible(char.model);
			if (visible) {
				visibleTargets.push([id, char.model, new Vector2(vector.X, vector.Y)]);
			}
		}

		const mouseLocation = UserInputService.GetMouseLocation();
		visibleTargets.sort((v, v2) => {
			const [, , vector] = v;
			const [, , vector2] = v2;

			return vector.sub(mouseLocation).Magnitude < vector2.sub(mouseLocation).Magnitude;
		});

		const target = visibleTargets[0];

		if (target !== undefined) {
			world.insert(target[0], Targeted());
			state.UIStore.dispatch(SetTarget(target[1]));
		}
	}
}

export = LockOn;
