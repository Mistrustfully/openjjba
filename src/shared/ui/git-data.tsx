import Roact from "@rbxts/roact";
import { withHooks } from "@rbxts/roact-hooked";
import { $git } from "rbxts-transform-debug";

function Ico(p: { img: string }) {
	return (
		<imagelabel
			Image={p.img}
			Size={UDim2.fromOffset(24, 24)}
			BackgroundTransparency={1}
			ScaleType={Enum.ScaleType.Fit}
		/>
	);
}

function Text(p: { text: string }) {
	return (
		<textlabel
			Size={UDim2.fromOffset(24, 24)}
			Text={p.text}
			BackgroundTransparency={1}
			TextColor3={new Color3(0, 0, 0)}
			TextXAlignment={Enum.TextXAlignment.Right}
			Font={Enum.Font.Ubuntu}
			TextSize={24}
			AutomaticSize="X"
		/>
	);
}

function GitData() {
	const git = $git();

	return (
		<screengui>
			<frame
				Size={new UDim2(1, 0, 0, 24)}
				Position={UDim2.fromScale(0, 1)}
				AnchorPoint={new Vector2(0, 1)}
				BackgroundTransparency={1}
			>
				<uipadding PaddingRight={new UDim(0, 6)} />
				<uilistlayout
					FillDirection={"Horizontal"}
					HorizontalAlignment={Enum.HorizontalAlignment.Right}
					Padding={new UDim(0, 6)}
				/>

				<Ico img={"rbxassetid://7661547096"} />
				<Text text={`${git.Commit}`} />
				<Ico img={"rbxassetid://7661548319"} />
				<Text text={`${git.Branch}`} />
			</frame>
		</screengui>
	);
}

export = withHooks(GitData);
