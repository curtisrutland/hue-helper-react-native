import createNamespace from "../createNamespace";
import { createStandardAction, ActionType, getType } from "typesafe-actions";
import { Reducer } from "redux";
import { PayloadAction } from 'typesafe-actions/dist/types';

const ns = createNamespace("bridge");

export interface BridgeState {
    userCreated: boolean;
    error: string | null;
    discoveryCompleted: boolean;
}

export const defaultState: BridgeState = {
    userCreated: false,
    error: null,
    discoveryCompleted: false
};

export const BridgeActions = {
    createUser: createStandardAction(ns`create_user`)(),
    createUserSuccess: createStandardAction(ns`createUserSuccess`)(),
    discover: createStandardAction(ns`discover`)(),
    discoveryCompleted: createStandardAction(ns`discovery_completed`)(),
    discoveryError: createStandardAction(ns`discover_error`)<string>()
};

export type BridgeActionsType = ActionType<typeof BridgeActions>;

export const reducer: Reducer<BridgeState> = (state = defaultState, action: BridgeActionsType) => {
    switch (action.type) {
        case getType(BridgeActions.createUserSuccess):
            return { ...state, userCreated: true };

        case getType(BridgeActions.discoveryCompleted):
            return { ...state, discoveryCompleted: true, error: null };

        case getType(BridgeActions.discoveryError):
            const payload = (<PayloadAction<string, string>>action).payload;
            return { ...state, discoveryCompleted: true, error: payload };

        default:
            return state;
    }
}

export default reducer;