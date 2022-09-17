import { Action } from "@rbxts/gamejoy/out/Actions";
import { useEvent, useHookState } from "@rbxts/matter";
import { Actions, Context } from "@rbxts/gamejoy/out/";
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
	const storage = useHookState<storage<Options, ActionContraint>>(cleanup);
	if (!storage.context) storage.context = context;
	if (!storage.action) storage.action = action;
	if (!storage.useEventBind) storage.useEventBind = new Instance("BindableEvent");

	if (!context.Has(action as never)) {
		context.Bind(action, () => {
			storage.useEventBind.Fire();
		});
	}

	return useEvent(storage.useEventBind, "Event");
}
