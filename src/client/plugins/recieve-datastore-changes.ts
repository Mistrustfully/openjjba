import { World } from "@rbxts/matter";
import Remotes from "shared/remotes";
import { IClientState } from "shared/types/state";

const DataRoduxStoreChanged = Remotes.Client.Get("DataRoduxStoreChanged");
export function RecieveDatastoreChanges(_: World, state: IClientState) {
	DataRoduxStoreChanged.Connect((action) => {
		state.PlayerData.dispatch(action);
	});
}
