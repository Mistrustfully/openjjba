// SPDX-FileCopyrightText: 2022 Christian Fletcher <mistrustfully@gmail.com>
//
// SPDX-License-Identifier: GPL-3.0-or-later

import Roact from "@rbxts/roact";
import { StoreProvider } from "@rbxts/roact-rodux-hooked";
import { HttpService, UserInputService } from "@rbxts/services";
import { CreateUIStore } from "shared/rodux/ui-store";
import MusicNotification from "./music-notification";

export = (instance: Instance) => {
	const store = CreateUIStore();
	store.dispatch({ type: "SetPlayingMusic", artist: "Test Artist", name: "Test Name" });
	const tree = Roact.mount(
		<StoreProvider store={store}>
			<MusicNotification />
		</StoreProvider>,
		instance,
	);

	const connection = UserInputService.InputBegan.Connect((i) => {
		if (i.KeyCode === Enum.KeyCode.Z) {
			store.dispatch({ type: "SetPlayingMusic", name: HttpService.GenerateGUID(), artist: "cool" });
		}
	});

	() => {
		connection.Disconnect();
		Roact.unmount(tree);
	};
};
