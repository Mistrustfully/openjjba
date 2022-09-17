// SPDX-FileCopyrightText: 2022 Christian Fletcher <mistrustfully@gmail.com>
//
// SPDX-License-Identifier: GPL-3.0-or-later

import Roact from "@rbxts/roact";
import GitData from "./git-data";

export = (parent: Instance) => {
	const tree = Roact.mount(<GitData />, parent);
	return () => {
		Roact.unmount(tree);
	};
};
