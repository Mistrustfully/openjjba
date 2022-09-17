// SPDX-FileCopyrightText: 2022 Christian Fletcher <mistrustfully@gmail.com>
//
// SPDX-License-Identifier: GPL-3.0-or-later

import { ServerSenderEvent } from "@rbxts/net/out/server/ServerEvent";
import Rodux, { AnyAction } from "@rbxts/rodux";

export function NetActionMiddleware<A extends Rodux.Action>(
	owner: Player,
	remote: ServerSenderEvent<[A]>,
): Rodux.Middleware {
	return (nextDispatch) => {
		return function (action: A) {
			remote.SendToPlayer(owner, action);
			nextDispatch(action as unknown as AnyAction);
		};
	};
}
