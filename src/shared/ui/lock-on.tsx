// SPDX-FileCopyrightText: 2022 Christian Fletcher <mistrustfully@gmail.com>
//
// SPDX-License-Identifier: GPL-3.0-or-later

import Roact from "@rbxts/roact";
import { withHooks } from "@rbxts/roact-hooked";
import { useSelector } from "@rbxts/roact-rodux-hooked";
import { useEffect, useBinding } from "@rbxts/roact-hooked";
import { IUIStore } from "shared/rodux/ui-store";
import { RunService } from "@rbxts/services";
let connection: RBXScriptConnection;
function LockOn() {
	const state = useSelector((state: IUIStore) => state.LockOn);

	const [rotation, setRotation] = useBinding(0);

	useEffect(() => {
		if (connection !== undefined) return;
		print("update");

		connection = RunService.RenderStepped.Connect(() => {
			const newRot = rotation.getValue() === 360 ? 1 : rotation.getValue() + 1;
			setRotation(newRot);
		});

		() => connection.Disconnect();
	});

	return (
		<billboardgui
			Adornee={state.Target?.PrimaryPart}
			Size={new UDim2(0.75, 30, 0.75, 30)}
			AlwaysOnTop={true}
			ResetOnSpawn={false}
		>
			<imagelabel
				Visible={state.Target === undefined ? false : true}
				Size={UDim2.fromScale(1, 1)}
				AnchorPoint={new Vector2(0.5, 0.5)}
				Image={"http://www.roblox.com/asset/?id=10843170432"}
				BackgroundTransparency={1}
				Position={UDim2.fromScale(0.5, 0.5)}
				Rotation={rotation}
			/>
		</billboardgui>
	);
}

export default withHooks(LockOn);
