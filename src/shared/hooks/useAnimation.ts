// SPDX-FileCopyrightText: 2022 Christian Fletcher <mistrustfully@gmail.com>
//
// SPDX-License-Identifier: MIT

import { useHookState } from "@rbxts/matter";

interface storage {
	animationTrack: AnimationTrack;
	animation: Animation;
	played: boolean;
}

function cleanup(storage: storage) {
	if (storage.animationTrack) {
		storage.animationTrack.Destroy();
	}
}

function useAnimation(animator: Animator, animation: Animation, extra: { weight?: number; speed?: number }) {
	const state = useHookState<storage>(animator, cleanup);
	if (state.animation !== animation) {
		state.animation = animation;
		if (state.animationTrack) {
			state.animationTrack.Stop();
			state.animationTrack.Destroy();
			state.played = false;
		}
	}

	if (state.animationTrack === undefined) {
		state.animationTrack = animator.LoadAnimation(animation);
	}

	const looped = state.animationTrack.Looped;
	if (!state.animationTrack.IsPlaying && (looped || (!looped && !state.played))) {
		state.played = true;
		state.animationTrack.Play();
	}

	state.animationTrack.AdjustSpeed(extra.speed !== undefined ? extra.speed : 1);
	state.animationTrack.AdjustWeight(math.max(extra.weight !== undefined ? extra.weight : 1, 0.0001));

	return state.animationTrack;
}
