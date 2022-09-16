import { World } from "@rbxts/matter";
import { Players, ReplicatedStorage, Workspace } from "@rbxts/services";
import { Renderable } from "shared/components";

function GetR6PartFromR15(r15part: Enum.BodyPartR15): Enum.BodyPart | undefined {
	switch (r15part) {
		case Enum.BodyPartR15.LeftFoot:
		case Enum.BodyPartR15.LeftLowerLeg:
		case Enum.BodyPartR15.LeftUpperLeg:
			return Enum.BodyPart.LeftLeg;

		case Enum.BodyPartR15.RightFoot:
		case Enum.BodyPartR15.RightLowerLeg:
		case Enum.BodyPartR15.RightUpperLeg:
			return Enum.BodyPart.RightLeg;

		case Enum.BodyPartR15.LeftHand:
		case Enum.BodyPartR15.LeftLowerArm:
		case Enum.BodyPartR15.LeftUpperArm:
			return Enum.BodyPart.LeftArm;

		case Enum.BodyPartR15.RightHand:
		case Enum.BodyPartR15.RightLowerArm:
		case Enum.BodyPartR15.RightUpperArm:
			return Enum.BodyPart.RightArm;

		case Enum.BodyPartR15.LowerTorso:
		case Enum.BodyPartR15.UpperTorso:
			return Enum.BodyPart.Torso;

		case Enum.BodyPartR15.Head:
			return Enum.BodyPart.Head;

		default:
			return undefined;
	}
}

function ReplaceRigParts(character: Instance) {
	const humanoid = character.FindFirstChildOfClass("Humanoid");
	if (humanoid === undefined || humanoid.Health <= 0) return;
	humanoid.UnequipTools();

	const humanoidDescription = humanoid.GetAppliedDescription();
	ReplicatedStorage.assets.CharacterRig.GetDescendants().forEach((part) => {
		if (part.IsA("BasePart")) {
			if (humanoidDescription && humanoidDescription.IsA("HumanoidDescription")) {
				// If using custom body part mesh, don't replace that part with Dogu15.
				const humanoidpart = character.FindFirstChild(part.Name);
				if (humanoidpart === undefined || !humanoidpart.IsA("BasePart")) return;
				const bodypart = GetR6PartFromR15(humanoid.GetBodyPartR15(humanoidpart));
				if (bodypart === undefined) return;
				if (humanoidDescription[bodypart.Name] !== 0) return;
			}

			humanoid.ReplaceBodyPartR15(part.Name as CastsToEnum<Enum.BodyPartR15>, part.Clone());
		}
	});
}

export function LoadCharaterRig(world: World) {
	Players.PlayerAdded.Connect((player) => {
		player.CharacterAppearanceLoaded.Connect((character) => {
			ReplaceRigParts(character);
		});

		player.CharacterAdded.Connect((character) => {
			world.spawn(Renderable({ model: character }));
		});
	});
}
