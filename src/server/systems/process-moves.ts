import { AnyEntity, World } from "@rbxts/matter";
import { useEvent } from "@rbxts/matter";
import { Move } from "shared/combat/moves";
import { MoveRunner, Moveset } from "shared/components";
import Remotes from "shared/remotes";

const UseMove = Remotes.Server.Get("UseMove");
const EndMove = Remotes.Server.Get("EndMove");

function getEntityFromPlayer(player: Player): AnyEntity | undefined {
	const id = player.Character?.GetAttribute("id") as AnyEntity;
	return id;
}

function getMoveFromPlayer(player: Player, moveIndex: number, world: World): Move | undefined {
	const entity = getEntityFromPlayer(player);
	if (entity === undefined) return;

	const moveset = world.get(entity, Moveset);
	if (moveset === undefined) return;

	const move = moveset.moveset[moveIndex];
	if (move === undefined) return;

	return move;
}

function ProcessMoves(world: World) {
	for (const [_, player, moveIndex] of useEvent("UseMove", UseMove)) {
		print("usemove");
		const move = getMoveFromPlayer(player, moveIndex, world);
		const id = getEntityFromPlayer(player);

		if (id === undefined) return;
		if (!move) return;
		if (move.onCooldown) return;

		world.spawn(
			MoveRunner({
				context: "Server",
				index: moveIndex,
				move: move,
				owner: id,
				clientDone: false,
			}),
		);
	}

	for (const [_, player, moveIndex] of useEvent("EndMove", EndMove)) {
		const move = getMoveFromPlayer(player, moveIndex, world);
		const id = getEntityFromPlayer(player);

		if (id === undefined || !move) return;
		for (const [moveRunnerId, moveRunner] of world.query(MoveRunner)) {
			if (moveRunner.owner === id && moveRunner.move === move) {
				world.insert(moveRunnerId, moveRunner.patch({ clientDone: true }));
			}
		}
	}
}

export = ProcessMoves;
