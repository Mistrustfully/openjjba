import { Players, ReplicatedStorage } from "@rbxts/services";

function ReplaceRigParts(character: Instance) {
	const humanoid = character.FindFirstChildOfClass("Humanoid");
	if (humanoid === undefined || humanoid.Health <= 0) return;
	humanoid.UnequipTools();

	ReplicatedStorage.assets.CharacterRig.GetDescendants().forEach((part) => {
		if (part.IsA("BasePart")) {
			print(part.Name);
			humanoid.ReplaceBodyPartR15(part.Name as CastsToEnum<Enum.BodyPartR15>, part.Clone());
		}
	});
}

export function LoadCharaterRig() {
	Players.PlayerAdded.Connect((player) => {
		player.CharacterAppearanceLoaded.Connect((character) => {
			ReplaceRigParts(character);
		});
	});
}
