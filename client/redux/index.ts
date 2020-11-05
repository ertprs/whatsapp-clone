import { createWrapper, HYDRATE } from "next-redux-wrapper";
import { AnyAction, combineReducers, createStore, Store } from "redux";
import { reducer as formReducer } from "redux-form";

const reducer = (state: any, action: AnyAction) => {
  if (action.type === HYDRATE) {
    const nextState = {
      ...state,
      ...action.payload
    };
    if (state.form) nextState.form = state.form;
    return nextState;
  }
  return combineReducer(state, action);
};

const initStore = (): Store => createStore(reducer);

const combineReducer = combineReducers({
  form: formReducer
});

export const wrapper = createWrapper(initStore);
