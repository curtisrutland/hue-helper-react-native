import createNamespace from "../createNamespace";
import { createStandardAction, ActionType, getType, isActionOf } from "typesafe-actions";
import { Reducer } from "redux";

const ns = createNamespace("nav");

export type AppTabNames = "Groups"
    | "Lights";

export interface NavigationState {
    showNav: boolean;
    activeTab: AppTabNames;
}

export const defaultState: NavigationState = {
    showNav: false,
    activeTab: "Groups"
};

export const NavigationActions = {
    setShowNav: createStandardAction(ns`set_show_nav`)<boolean>(),
    setActiveTab: createStandardAction(ns`set_active_tab`)<AppTabNames>()
};

export type NavigationActionsType = ActionType<typeof NavigationActions>;

export const reducer: Reducer<NavigationState, NavigationActionsType> = (state = defaultState, action: NavigationActionsType) => {
    switch (action.type) {
        case getType(NavigationActions.setActiveTab):
            if (isActionOf(NavigationActions.setActiveTab, action) && action.payload !== state.activeTab) {
                return { ...state, activeTab: action.payload };
            }
        case getType(NavigationActions.setShowNav):
            if (isActionOf(NavigationActions.setShowNav, action))
                return { ...state, showNav: action.payload };
        default:
            return state;
    }
}

export default reducer;