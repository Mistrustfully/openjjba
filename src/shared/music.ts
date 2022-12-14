// SPDX-FileCopyrightText: 2022 Christian Fletcher <mistrustfully@gmail.com>
//
// SPDX-License-Identifier: GPL-3.0-or-later

export type Song = {
	id: number;
	artist: string;
	name: string;
};

export const Music: { Casual: Song[]; Combat: Song[] } = {
	Casual: [{ id: 10946356252, name: "Pretty Little Lies", artist: "Holizna" }], // https://freemusicarchive.org/music/holiznacc0/lo-fi-and-chill/pretty-little-lies-1/

	Combat: [{ id: 10946120990, name: "PRIME TURBO", artist: "Jameskii" }],
};
