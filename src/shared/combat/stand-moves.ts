// SPDX-FileCopyrightText: 2022 Christian Fletcher <mistrustfully@gmail.com>
//
// SPDX-License-Identifier: GPL-3.0-or-later

import { Stand } from "shared/types/stands";
import { Move, MoveData, Moves, MergeMove } from "./moves";

export const StandMoves: { [index in Stand]: Move[] } = {
	[Stand.Standless]: [],
	[Stand.ZaShadow]: [MergeMove(Moves.Summon, { cooldown: 5 }), MergeMove(Moves.Teleport, {})],
};
