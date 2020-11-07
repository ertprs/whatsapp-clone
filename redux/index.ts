import {
  AnyAction,
  applyMiddleware,
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

const bindMiddleware = (middleware: ThunkMiddleware[]): StoreEnhancer => {
  if (process.env.NODE_ENV !== "production") {
    return composeWithDevTools(applyMiddleware(...middleware));
  }
  return applyMiddleware(...middleware);
};

const combinedReducer = combineReducers({
  form: formReducer,
  user: userReducer
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
