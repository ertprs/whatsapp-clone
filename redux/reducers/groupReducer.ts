import { Group } from "../../interfaces/Group";
import { User } from "../../interfaces/User";
import { FetchAllGroups } from "../../pages";
import {
  AddGroup,
  SetGroupContainer,
  SetGroupSubject,
  SetNewGroup,
  SetSelectedContacts
} from "../actions";
import { ActionTypes } from "../actions/types";

export interface GroupState {
  newGroup: boolean;
  groupSubject: boolean;
  groupContainer: boolean;
  groups: Group[] | [] | null;
  selectedContacts: User[] | [];
}

const INITIAL_STATE: GroupState = {
  newGroup: false,
  groupSubject: false,
  groupContainer: false,
  groups: null,
  selectedContacts: []
};

type Action =
  | SetNewGroup
  | SetGroupSubject
  | SetGroupContainer
  | FetchAllGroups
  | AddGroup
  | SetSelectedContacts;

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
    case ActionTypes.fetchAllGroups:
      return { ...state, groups: action.payload };
    case ActionTypes.addGroup:
      const found = state.groups?.find(
        grp => grp._id.toString() === action.payload._id.toString()
      );
      if (found) {
        return { ...state };
      }
      return { ...state, groups: [action.payload, ...state.groups] };
    case ActionTypes.setSelectedContacts:
      return { ...state, selectedContacts: action.payload };
    default:
      return state;
  }
};
