import { useEvent, useHookState } from "@rbxts/matter";
import { Context } from "@rbxts/gamejoy/out/";
import { ActionLike, ContextOptions, RawActionEntry } from "@rbxts/gamejoy/out/Definitions/Types";

interface storage<Options extends ContextOptions, ActionContraint extends RawActionEntry> {
	context: Context<Options>;
	action: ActionLike<ActionContraint>;
	useEventBind: BindableEvent;
}

function cleanup<Options extends ContextOptions, ActionContraint extends RawActionEntry>(
	storage: storage<Options, ActionContraint>,
) {
	storage.context.Unbind(storage.action);
	storage.useEventBind.Destroy();
}

export function useGamejoyBind<Options extends ContextOptions, ActionContraint extends RawActionEntry>(
	context: Context<Options>,
	action: ActionLike<ActionContraint>,
) {
	const storage = useHookState<storage<Options, ActionContraint>>(action, cleanup);
	if (!storage.context) storage.context = context;
	if (!storage.useEventBind) storage.useEventBind = new Instance("BindableEvent");
	if (!storage.action) {
		storage.action = action;
		context.Bind(storage.action, () => {
			storage.useEventBind.Fire();
		});
	}

	return useEvent(storage.useEventBind, "Event");
}
