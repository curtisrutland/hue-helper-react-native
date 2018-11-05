import { createStore, Store, applyMiddleware, combineReducers } from "redux";
import createSagaMiddleware, { SagaMiddleware } from "redux-saga";
import {
  defaultState as bridgeDefaultState,
  BridgeState, BridgeActionsType, BridgeActions,
  default as bridge
} from './bridge';
import {
  defaultState as groupsDefaultState,
  GroupsState, GroupsActionsType,
  default as groups
} from "./groups";
import {
  defaultState as navigationDefaultState,
  NavigationState, NavigationActionsType,
  default as navigation
} from "./navigation";
import rootSaga from "./rootSaga";
import { composeWithDevTools } from "redux-devtools-extension";

export interface ApplicationState {
  bridge: BridgeState,
  groups: GroupsState,
  navigation: NavigationState
};

const defaultState: ApplicationState = {
  bridge: bridgeDefaultState,
  groups: groupsDefaultState,
  navigation: navigationDefaultState
};

export type ApplicationActionsType = BridgeActionsType 
  | GroupsActionsType
  | NavigationActionsType;

const rootReducer = combineReducers<ApplicationState>({
  bridge,
  groups,
  navigation
});

export function configureStore(): Store<ApplicationState, ApplicationActionsType> {
  const state: ApplicationState = defaultState;
  const sagaMiddleware = createSagaMiddleware();
  const middleware = composeWithDevTools(applyMiddleware(sagaMiddleware));
  const store = createStore(rootReducer, state, middleware);
  init(store, sagaMiddleware);
  return store as Store<ApplicationState, ApplicationActionsType>;
}

function init(store: Store<ApplicationState, ApplicationActionsType>, sagaMiddleware: SagaMiddleware<{}>) {
  sagaMiddleware.run(rootSaga);
  store.dispatch(BridgeActions.discover());
}