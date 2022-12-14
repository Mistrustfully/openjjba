// SPDX-FileCopyrightText: 2022 Ukendio
//
// SPDX-License-Identifier: MIT

/// https://github.com/Ukendio/for-animia/blob/master/src/server/systems/replication.ts

import { AnyComponent, useEvent, World } from "@rbxts/matter";
import { ComponentCtor } from "@rbxts/matter/lib/component";
import { Players } from "@rbxts/services";
import { Blocking, ItemComponent, Renderable, StandRig, PlayerLike, Dodging } from "shared/components";
import Remotes, { ComponentPayload } from "shared/remotes";
import type { ComponentNames } from "shared/types/serde";

const ReplicateRemote = Remotes.Server.Get("Replication");
const ReplicatedComponents = new Set<ComponentCtor>([
	PlayerLike,

	Renderable,
	StandRig,
	ItemComponent,
	Blocking,
	Dodging,
]);

function Replication(world: World): void {
	for (const [, plr] of useEvent(Players, "PlayerAdded")) {
		const payload: ComponentPayload = new Map();

		for (const [id, entityData] of world) {
			const entityPayload = new Map<ComponentNames, { data: AnyComponent }>();
			payload.set(tostring(id), entityPayload);

			for (const [component, componentInstance] of entityData) {
				if (ReplicatedComponents.has(component)) {
					entityPayload.set(tostring(component) as ComponentNames, { data: componentInstance });
				}
			}
		}

		ReplicateRemote.SendToPlayer(plr, payload);
	}

	const changes = new Map<string, Map<ComponentNames, { data: AnyComponent }>>();

	for (const component of ReplicatedComponents) {
		for (const [entityId, record] of world.queryChanged(component)) {
			const key = tostring(entityId);
			const name = tostring(component) as ComponentNames;

			if (!changes.has(key)) {
				changes.set(key, new Map());
			}

			if (world.contains(entityId)) {
				changes.get(key)?.set(name, { data: record.new! });
			}
		}
	}

	if (next(changes)[0] !== undefined) {
		ReplicateRemote.SendToAllPlayers(changes);
	}
}

export = {
	system: Replication,
	priority: math.huge,
};
