// SPDX-FileCopyrightText: 2022 Christian Fletcher <mistrustfully@gmail.com>
//
// SPDX-License-Identifier: GPL-3.0-or-later

import { AnyEntity, component } from "@rbxts/matter";
import { Move } from "./combat/moves/index";
import { Item } from "./types/items";

export const LocalPlayer = component("LocalPlayerComponent");
export const PlayerLike = component("PlayerLike");
export const Health = component<{ health: number }>();

export const StandRig = component<{ model: Model }>("StandRig");
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

export const Hovered = component("Hovered");

type SpacialHitbox =
	| {
			type: "Radius";
			position: Vector3;
			size: number;
	  }
	| {
			type: "Hitbox";
			position: CFrame;
			size: Vector3;
	  };

export const Hitbox = component<
	SpacialHitbox & {
		currentHit: AnyEntity[];
	}
>("Hitbox");

export const CombatTag = component<{
	taggedBy: AnyEntity;
	damageMap: Map<AnyEntity, number>;
}>("CombatTag");

export const DamageRequest = component<{ damage: number; owner: AnyEntity; target: AnyEntity }>("DamageRequest");
export const MoveRunner = component<{
	move: Move;
	owner: AnyEntity;
	context: "Client" | "OtherClients" | "Server";
	index: number;
	clientDone?: boolean;
}>("MoveRunner");
export const Moveset = component<{ moveset: Move[] }>("Moveset");
