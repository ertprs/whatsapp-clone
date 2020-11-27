import { Group } from "../../interfaces/Group";
import { GroupMsg } from "../../interfaces/GroupMsg";
import { User } from "../../interfaces/User";
import { FetchAllGroups } from "../../pages";
import {
  AddCurrentGroup,
  AddGroup,
  AddGroupMessage,
  FetchGroupMessages,
  SetGroupChat,
  SetGroupContainer,
  SetGroupInfo,
  SetGroupSubject,
  SetNewGroup,
  SetSelectedContacts,
  SetSelectGroupMessages
} from "../actions";
import { ActionTypes } from "../actions/types";

export interface GroupState {
  newGroup: boolean;
  groupSubject: boolean;
  groupContainer: boolean;
  groups: Group[] | [] | null;
  selectedContacts: User[] | [];
  groupMessages: GroupMsg[] | [] | null;
  groupInfo: boolean;
  groupChat: boolean;
  currentGroup: Group | null;
  groupMessageLoading: boolean;
  selectGroupMessages: boolean;
}

const INITIAL_STATE: GroupState = {
  newGroup: false,
  groupSubject: false,
  groupContainer: false,
  groups: null,
  selectedContacts: [],
  groupMessages: null,
  groupInfo: false,
  groupChat: false,
  currentGroup: null,
  groupMessageLoading: false,
  selectGroupMessages: false
};

type Action =
  | SetNewGroup
  | SetGroupSubject
  | SetGroupContainer
  | FetchAllGroups
  | AddGroup
  | SetSelectedContacts
  | FetchGroupMessages
  | AddGroupMessage
  | SetGroupInfo
  | SetGroupChat
  | AddCurrentGroup
  | SetSelectGroupMessages;

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
        const filteredGroups = state.groups?.filter(
          grp => grp._id !== found._id
        );
        return { ...state, groups: [action.payload, ...filteredGroups] };
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
    case ActionTypes.setGroupInfo:
      return { ...state, groupInfo: action.payload };
    case ActionTypes.setGroupChat:
      return { ...state, groupChat: action.payload };
    case ActionTypes.addCurrentGroup:
      return { ...state, currentGroup: action.payload };
    case ActionTypes.groupMessagesLoadingStart:
      return { ...state, groupMessageLoading: true };
    case ActionTypes.groupMessagesLoadingStop:
      return { ...state, groupMessageLoading: false };
    case ActionTypes.setSelectGroupMessages:
      return { ...state, selectGroupMessages: action.payload };
    default:
      return state;
  }
};
