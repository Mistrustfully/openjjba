// SPDX-FileCopyrightText: 2022 Christian Fletcher <mistrustfully@gmail.com>
//
// SPDX-License-Identifier: GPL-3.0-or-later

import { start } from "shared/start";
import { ReplicatedStorage } from "@rbxts/services";
import { IServerState } from "shared/types/state";
import { LoadPlayerData } from "./plugins/load-player-data";
import { UseTags } from "./plugins/use-tags";
import { LoadCharaterRig } from "./plugins/load-character";

declare const script: { systems: Folder };
const state: IServerState = {};

start([script.systems, ReplicatedStorage.shared.systems], state)(LoadPlayerData, UseTags, LoadCharaterRig);
