import {
  AnyAction,
  applyMiddleware,
  CombinedState,
  combineReducers,
  createStore,
  Store,
  StoreEnhancer
} from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import thunk, { ThunkMiddleware } from "redux-thunk";
import { createWrapper, HYDRATE } from "next-redux-wrapper";
import { reducer as formReducer } from "redux-form";
import { userReducer } from "./reducers/userReducer";
import { Redux } from "../interfaces/Redux";
import { Reducer } from "react";
import { messageReducer } from "./reducers/messageReducer";
import { groupReducer } from "./reducers/groupReducer";

const bindMiddleware = (middleware: ThunkMiddleware[]): StoreEnhancer => {
  return composeWithDevTools(applyMiddleware(...middleware));
};

const combinedReducer = combineReducers<
  Reducer<CombinedState<Redux>, AnyAction>
>({
  form: formReducer,
  user: userReducer,
  message: messageReducer,
  group: groupReducer
});

const reducer = (state: any, action: AnyAction) => {
  if (action.type === HYDRATE) {
    const nextState = {
      ...state,
      ...action.payload
    };
    if (state.form) nextState.form = state.form;
    return nextState;
  } else {
    return combinedReducer(state, action);
  }
};

const initStore = (): Store => createStore(reducer, bindMiddleware([thunk]));

export const wrapper = createWrapper(initStore);
