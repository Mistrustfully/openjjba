// SPDX-FileCopyrightText: 2022 Christian Fletcher <mistrustfully@gmail.com>
//
// SPDX-License-Identifier: GPL-3.0-or-later

import Roact from "@rbxts/roact";
import { withHooks, useEffect, useState } from "@rbxts/roact-hooked";
import { useSelector } from "@rbxts/roact-rodux-hooked";
import { IUIStore } from "shared/rodux/ui-store";
import { Instant, Spring, useGroupMotor, useSingleMotor } from "@rbxts/roact-hooked-plus";

function Ico(p: { img: string; transparency: Roact.Binding<number> }) {
	return (
		<imagelabel
			Image={p.img}
			Size={UDim2.fromOffset(32, 32)}
			BackgroundTransparency={1}
			ScaleType={Enum.ScaleType.Fit}
			ImageTransparency={p.transparency}
		/>
	);
}

function Text(p: { text: string; transparency: Roact.Binding<number> }) {
	return (
		<textlabel
			Size={UDim2.fromOffset(32, 32)}
			Text={p.text}
			BackgroundTransparency={1}
			TextColor3={new Color3(1, 1, 1)}
			TextXAlignment={Enum.TextXAlignment.Left}
			Font={Enum.Font.Ubuntu}
			TextSize={32}
			AutomaticSize="X"
			TextTransparency={p.transparency}
		/>
	);
}

function MusicNotification() {
	const { name, artist } = useSelector((state: IUIStore) => state.Music);

	const [position, setPositionGoal] = useGroupMotor([-1, 1]);
	const [transparency, setTransparencyGoal] = useSingleMotor(0);
	const [waittask, setWaittask] = useState<thread | undefined>(undefined);

	useEffect(() => {
		if (name === "null" || artist === "null") return () => {};
		if (waittask) task.cancel(waittask);

		setPositionGoal([new Instant(-1), new Instant(1)]);
		setTransparencyGoal(new Instant(0));

		task.wait();

		setPositionGoal([new Spring(0, { frequency: 0.7 }), new Spring(1)]);
		setWaittask(
			task.delay(5, () => {
				setTransparencyGoal(new Spring(1, { frequency: 0.7 }));
			}),
		);

		() => {
			if (waittask) task.cancel(waittask);
		};
	}, [name, artist]);

	return (
		<screengui>
			<frame
				Size={new UDim2(1, 0, 0, 32)}
				AnchorPoint={new Vector2(0, 1)}
				BackgroundTransparency={1}
				Position={position.map((p) => {
					return UDim2.fromScale(p[0], p[1]);
				})}
			>
				<uipadding PaddingLeft={new UDim(0, 6)} />
				<uilistlayout
					FillDirection={"Horizontal"}
					HorizontalAlignment={Enum.HorizontalAlignment.Left}
					Padding={new UDim(0, 6)}
				/>
				<Ico img="http://www.roblox.com/asset/?id=6034323673" transparency={transparency} />
				<Text text={name + " - " + artist} transparency={transparency} />
			</frame>
		</screengui>
	);
}

export = withHooks(MusicNotification);
