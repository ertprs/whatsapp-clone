import { SetNewGroup } from "../actions";
import { ActionTypes } from "../actions/types";

export interface GroupState {
  newGroup: boolean;
}

const INITIAL_STATE: GroupState = {
  newGroup: false
};

type Action = SetNewGroup;

export const groupReducer = (
  state = INITIAL_STATE,
  action: Action
): GroupState => {
  switch (action.type) {
    case ActionTypes.setNewGroup:
      return { ...state, newGroup: action.payload };
    default:
      return state;
  }
};
