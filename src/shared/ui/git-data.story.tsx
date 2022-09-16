import Roact from "@rbxts/roact";
import GitData from "./git-data";

export = (parent: Instance) => {
	const tree = Roact.mount(<GitData />, parent);
	return () => {
		Roact.unmount(tree);
	};
};
