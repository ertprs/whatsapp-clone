import { SetGroupContainer, SetGroupSubject, SetNewGroup } from "../actions";
import { ActionTypes } from "../actions/types";

export interface GroupState {
  newGroup: boolean;
  groupSubject: boolean;
  groupContainer: boolean;
}

const INITIAL_STATE: GroupState = {
  newGroup: false,
  groupSubject: false,
  groupContainer: false
};

type Action = SetNewGroup | SetGroupSubject | SetGroupContainer;

export const groupReducer = (
  state = INITIAL_STATE,
  action: Action
): GroupState => {
  switch (action.type) {
    case ActionTypes.setNewGroup:
      return { ...state, newGroup: action.payload };
    case ActionTypes.setGroupSubject:
      return { ...state, groupSubject: action.payload };
    case ActionTypes.setGroupContainer:
      return { ...state, groupContainer: action.payload };
    default:
      return state;
  }
};
