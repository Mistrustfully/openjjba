// SPDX-FileCopyrightText: 2022 Christian Fletcher <mistrustfully@gmail.com>
//
// SPDX-License-Identifier: GPL-3.0-or-later

import { Spring } from "@rbxts/flipper";
import { useEvent, World } from "@rbxts/matter";
import { SoundService } from "@rbxts/services";
import { CombatTag } from "shared/components";
import { useMotor } from "shared/hooks/useMotor";
import { Music, Song } from "shared/music";
import { IClientState } from "shared/types/state";

function GetRandomValue<T>(object: T[]) {
	return object[math.random(0, object.size() - 1)];
}

const FadingSongs: [Sound, boolean][] = [];

function PlayMusic(world: World, state: IClientState) {
	function PlaySong(song: Song) {
		if (state.Music) {
			const index = FadingSongs.findIndex((value: [Sound, boolean]) => {
				return state.Music === value[0];
			});

			if (index !== undefined) {
				FadingSongs.remove(index);
			}

			FadingSongs.push([state.Music, false]);
		}

		state.Music = undefined;

		const sound = new Instance("Sound");
		sound.SoundId = "rbxassetid://" + tostring(song.id);
		sound.Parent = SoundService;
		sound.Volume = 0;
		sound.Play();

		state.Music = sound;

		task.delay(2, () => {
			if (state.Music !== sound) return;

			state.UIStore.dispatch({
				type: "SetPlayingMusic",
				artist: song.artist,
				name: song.name,
			});

			FadingSongs.push([state.Music, true]);
		});
	}

	FadingSongs.forEach(([sound, dir], index) => {
		sound.Volume = useMotor(new Spring(dir ? 1 : 0, { frequency: 0.5 }), dir ? 0 : 1, sound);
		if (sound.Volume < 0.05 && !dir) {
			FadingSongs.remove(index);
			sound.Destroy();
		} else if (sound.Volume > 0.99 && dir) {
			FadingSongs.remove(index);
		}
	});

	if (!state.Music) {
		PlaySong(GetRandomValue(Music.Casual));
	}

	for (const [_] of useEvent(state.Music!, "Ended")) {
		state.Music = undefined;
	}

	for (const [_, tag] of world.queryChanged(CombatTag)) {
		if (tag.new) {
			PlaySong(GetRandomValue(Music.Combat));
		} else if (tag.old) {
			PlaySong(GetRandomValue(Music.Casual));
		}
	}
}

export = PlayMusic;
