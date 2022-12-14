// SPDX-FileCopyrightText: 2022 Christian Fletcher <mistrustfully@gmail.com>
//
// SPDX-License-Identifier: MIT

import { GroupMotor, SingleMotor, Spring } from "@rbxts/flipper";
import { useDeltaTime, useHookState } from "@rbxts/matter";

type Motors = GroupMotor<number[]> | SingleMotor;
interface storage<T extends Motors> {
	motor?: T;
}

function cleanup<T extends Motors>(storage: storage<T>) {
	storage.motor?.destroy();
}

export function useMotor(goal: Spring, initial: number, discrim?: unknown) {
	const storage = useHookState<storage<SingleMotor>>(discrim, cleanup);
	if (storage.motor === undefined) {
		storage.motor = new SingleMotor(initial);
	}

	storage.motor.setGoal(goal);
	storage.motor.step(useDeltaTime());

	return storage.motor.getValue();
}

export function useGroupMotor(goal: Spring[], initial: number[], discrim?: unknown) {
	const storage = useHookState<storage<GroupMotor<number[]>>>(discrim, cleanup);
	if (storage.motor === undefined) {
		storage.motor = new GroupMotor<number[]>(initial);
	}

	storage.motor.setGoal(goal);
	storage.motor.step(useDeltaTime());

	return storage.motor.getValue();
}
