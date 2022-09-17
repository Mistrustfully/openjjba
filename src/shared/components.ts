// SPDX-FileCopyrightText: 2022 Christian Fletcher <mistrustfully@gmail.com>
//
// SPDX-License-Identifier: GPL-3.0-or-later

import { component } from "@rbxts/matter";
import { IPlayerData } from "shared/types/player-data";
import { Move } from "./combat/moves";
import { Item } from "./types/items";

export const PlayerData = component<IPlayerData>("PlayerData");
export const PlayerComponent = component<{ player: Player }>("PlayerComponent");
export const LocalPlayerComponent = component<{ localplayer: Player }>("LocalPlayerComponent");
export const PlayerLike = component("PlayerLike");

export const StandRig = component<{ model: Model }>("StandRig");
export const MovesComponent = component<{ moves: Move[] }>("MovesComponent");
export const ItemComponent = component<{ id: Item }>("ItemComponent");
export const Renderable = component<{ model: Model }>("Renderable");
export const Targetable = component("Targetable");
export const Targeted = component<{}>("Targeted");

export const Blocking = component<{ frame: number }>("Blocking", {
	frame: 0,
});

export const Dodging = component<{ frame: number }>("Dodging", {
	frame: 0,
});
