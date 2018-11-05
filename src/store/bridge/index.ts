import createNamespace from "../createNamespace";
import { createStandardAction, ActionType, getType, isActionOf } from "typesafe-actions";
import { Reducer } from "redux";

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
    discoveryError: createStandardAction(ns`discover_error`)<string>(),
    createUser: createStandardAction(ns`create_user`)(),
    createUserSuccess: createStandardAction(ns`createUserSuccess`)(),
    discover: createStandardAction(ns`discover`)(),
    discoveryCompleted: createStandardAction(ns`discovery_completed`)(),
    clearAllData: createStandardAction(ns`clear_all_data`)()
};

export type BridgeActionsType = ActionType<typeof BridgeActions>;

export const reducer: Reducer<BridgeState> = (state = defaultState, action: BridgeActionsType) => {
    switch (action.type) {

        case getType(BridgeActions.clearAllData):
            return { ...defaultState };

        case getType(BridgeActions.createUserSuccess):
            return { ...state, userCreated: true };

        case getType(BridgeActions.discoveryCompleted):
            return { ...state, discoveryCompleted: true, error: null };

        case getType(BridgeActions.discoveryError): {
            let newState = { ...state };
            if (isActionOf(BridgeActions.discoveryError, action)) {
                newState.discoveryCompleted = true;
                newState.error = action.payload;
            }
            return newState;
        }
        default:
            return state;
    }
}

export default reducer;