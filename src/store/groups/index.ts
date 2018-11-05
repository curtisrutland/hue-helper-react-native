import createNamespace from "../createNamespace";
import { createStandardAction, ActionType, getType, isActionOf } from "typesafe-actions";
import { Reducer } from "redux";
import { Groups, GroupApiAction } from "../../models/group";

const ns = createNamespace("groups");

export interface GroupsState {
    groupsLoaded: boolean;
    error: string | null;
    groups: Groups | null;
}

export const defaultState: GroupsState = {
    groupsLoaded: false,
    error: null,
    groups: null
};

export interface SetGroupActionPayload {
    apiAction: GroupApiAction;
    groupId: string;
}

export const GroupsActions = {
    loadGroups: createStandardAction(ns`load_groups`)<void>(),
    loadGroupsSuccess: createStandardAction(ns`load_groups_success`)<Groups>(),
    loadGroupsError: createStandardAction(ns`load_group_error`)<string>(),
    setGroupAction: createStandardAction(ns`set_group_action`)<SetGroupActionPayload>()
}

export type GroupsActionsType = ActionType<typeof GroupsActions>;

export const reducer: Reducer<GroupsState> = (state = defaultState, action: GroupsActionsType) => {
    switch (action.type) {
        case getType(GroupsActions.loadGroupsSuccess): {
            let newState = { ...state };
            if (isActionOf(GroupsActions.loadGroupsSuccess, action)) {
                newState.groups = action.payload;
                newState.groupsLoaded = true;
            }
            return newState;
        }

        default:
            return state;
    }
}

export default reducer;