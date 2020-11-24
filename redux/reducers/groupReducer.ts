import { Group } from "../../interfaces/Group";
import { GroupMsg } from "../../interfaces/GroupMsg";
import { User } from "../../interfaces/User";
import { FetchAllGroups } from "../../pages";
import {
  AddGroup,
  AddGroupMessage,
  FetchGroupMessages,
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
  groupMessages: GroupMsg[] | [] | null;
}

const INITIAL_STATE: GroupState = {
  newGroup: false,
  groupSubject: false,
  groupContainer: false,
  groups: null,
  selectedContacts: [],
  groupMessages: null
};

type Action =
  | SetNewGroup
  | SetGroupSubject
  | SetGroupContainer
  | FetchAllGroups
  | AddGroup
  | SetSelectedContacts
  | FetchGroupMessages
  | AddGroupMessage;

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
    case ActionTypes.fetchGroupMessages:
      return { ...state, groupMessages: action.payload };
    case ActionTypes.addGroupMessage:
      if (state.groupMessages) {
        return {
          ...state,
          groupMessages: [...state.groupMessages, action.payload]
        };
      }
      return { ...state, groupMessages: [action.payload] };
    default:
      return state;
  }
};
