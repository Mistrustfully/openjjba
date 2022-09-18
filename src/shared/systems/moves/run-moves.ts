// SPDX-FileCopyrightText: 2022 Christian Fletcher <mistrustfully@gmail.com>
//
// SPDX-License-Identifier: GPL-3.0-or-later

import { AnyEntity, World } from "@rbxts/matter";
import { Players } from "@rbxts/services";
import { Move } from "shared/combat/moves";
import { MoveRunner, Renderable } from "shared/components";
import Remotes from "shared/remotes";

function run(
	world: World,
	move: Move,
	owner: AnyEntity,
	context: "Client" | "Server" | "OtherClients",
	clientDone?: boolean,
) {
	switch (context) {
		case "Server":
			return move.onServer(owner, world, clientDone);

		case "Client":
			return move.onClient(owner, world);

		case "OtherClients":
			return move.otherClients(owner, world);
	}
}

function RunMoves(world: World) {
	for (const [runnerId, moveRunner] of world.queryChanged(MoveRunner)) {
		if (moveRunner.new && !moveRunner.old) {
			// MoveRunner was created
			if (moveRunner.new.move.onCooldown) {
				world.despawn(runnerId);
				continue;
			}

			moveRunner.new.move.onCooldown = true;
			if (moveRunner.new.context === "Client") {
				const index = moveRunner.new.index;
				task.defer(() => {
					Remotes.Client.Get("UseMove").SendToServer(index);
				});
			}
		} else if (!moveRunner.new && moveRunner.old) {
			// MoveRunner was destroyed
			if (moveRunner.old.context === "Client") {
				const index = moveRunner.old.index;
				task.defer(() => {
					print("a");
					Remotes.Client.Get("EndMove").SendToServer(index);
				});
			} else if (moveRunner.old.context === "Server") {
				const move = moveRunner.old.move;
				const owner = moveRunner.old.owner;
				const index = moveRunner.old.index;

				task.delay(move.cooldown, () => {
					if (!world.contains(owner)) return;
					move.onCooldown = false;

					const character = world.get(owner, Renderable);
					if (!character) return;
					const player = Players.GetPlayerFromCharacter(character.model);
					if (!player) return;

					Remotes.Server.Get("MoveCooldownEnded").SendToPlayer(player, index);
				});
			}
		}
	}

	for (const [runnerId, { move, owner, context, clientDone }] of world.query(MoveRunner)) {
		const destroy = run(world, move, owner, context, clientDone);

		if (!destroy) {
			world.despawn(runnerId);
		}
	}
}

export = RunMoves;
