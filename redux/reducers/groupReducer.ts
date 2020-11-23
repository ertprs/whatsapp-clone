import { SetGroupSubject, SetNewGroup } from "../actions";
import { ActionTypes } from "../actions/types";

export interface GroupState {
  newGroup: boolean;
  groupSubject: boolean;
}

const INITIAL_STATE: GroupState = {
  newGroup: false,
  groupSubject: false
};

type Action = SetNewGroup | SetGroupSubject;

export const groupReducer = (
  state = INITIAL_STATE,
  action: Action
): GroupState => {
  switch (action.type) {
    case ActionTypes.setNewGroup:
      return { ...state, newGroup: action.payload };
    case ActionTypes.setGroupSubject:
      return { ...state, groupSubject: action.payload };
    default:
      return state;
  }
};
