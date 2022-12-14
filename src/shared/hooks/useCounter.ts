// SPDX-FileCopyrightText: 2022 Christian Fletcher <mistrustfully@gmail.com>
//
// SPDX-License-Identifier: MIT

import { useHookState } from "@rbxts/matter";

interface storage {
	last: number;
}

export function useCounter() {
	const storage = useHookState<storage>();
	if (storage.last === undefined) storage.last = 0;
	storage.last = storage.last + 1;

	return storage.last;
}
