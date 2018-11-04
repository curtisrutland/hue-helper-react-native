import { createStore, Store, applyMiddleware, AnyAction } from "redux";
import createSagaMiddleware, { SagaMiddleware } from "redux-saga";
import {
  defaultState as bridgeDefaultState,
  BridgeState, BridgeActionsType, BridgeActions
} from './bridge';
import rootReducer from "./rootReducer";
import rootSaga from "./rootSaga";

declare var module: any;

export interface ApplicationState {
  bridge: BridgeState
};

const defaultState: ApplicationState = {
  bridge: bridgeDefaultState
};

export type ApplicationActionsType = BridgeActionsType;

export function configureStore(): Store<ApplicationState, ApplicationActionsType> {
  const state: ApplicationState = defaultState;
  const sagaMiddleware = createSagaMiddleware();
  const store = createStore(rootReducer, state, applyMiddleware(sagaMiddleware));
  init(store, sagaMiddleware);
  return store as Store<ApplicationState, ApplicationActionsType>;
}

function init(store: Store<ApplicationState, AnyAction>, sagaMiddleware: SagaMiddleware<{}>) {
  sagaMiddleware.run(rootSaga);
  store.dispatch(BridgeActions.discover()); 
  if (module.hot) {
    // Enable Webpack hot module replacement for reducers
    module.hot.accept('./rootReducer', () => {
      const nextRootReducer = require('./rootReducer');
      store.replaceReducer(nextRootReducer);
    });
  } 
}