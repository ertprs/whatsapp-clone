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
  SetGroupDisplay,
  SetGroupInfo,
  SetGroupMsgInfo,
  SetGroupSearch,
  SetGroupSubject,
  SetGrpScrollMsg,
  SetNewGroup,
  SetSelectedContacts,
  SetSelectedInfoMsg,
  SetSelectGroupMessages,
  UpdateGroupRead
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
  groupDisplay: boolean;
  groupSearch: boolean;
  grpScrollMsg: GroupMsg | null;
  groupMessageInfo: boolean;
  selectedInfoMsg: GroupMsg | null;
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
  selectGroupMessages: false,
  groupDisplay: false,
  groupSearch: false,
  grpScrollMsg: null,
  groupMessageInfo: false,
  selectedInfoMsg: null
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
  | SetSelectGroupMessages
  | SetGroupDisplay
  | UpdateGroupRead
  | SetGroupSearch
  | SetGrpScrollMsg
  | SetGroupMsgInfo
  | SetSelectedInfoMsg;

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
        const msgExistsIndx = state.groupMessages.findIndex(
          msg => msg.createdAt === action.payload.createdAt
        );
        if (msgExistsIndx !== -1) {
          const grpMsgs = [...state.groupMessages];
          grpMsgs.splice(msgExistsIndx, 1);
          return { ...state, groupMessages: [...grpMsgs, action.payload] };
        }
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
    case ActionTypes.setGroupDisplay:
      return { ...state, groupDisplay: action.payload };
    case ActionTypes.updateGroupRead:
      const grpMsgs = [...state.groupMessages];
      action.payload.forEach(msg => {
        const msgIndx = state.groupMessages!.findIndex(m => m._id === msg._id);
        if (msgIndx !== -1) {
          grpMsgs[msgIndx] = msg;
        }
      });
      return { ...state, groupMessages: grpMsgs };
    case ActionTypes.setGroupSearch:
      return { ...state, groupSearch: action.payload };
    case ActionTypes.setGrpScrollMsg:
      return { ...state, grpScrollMsg: action.payload };
    case ActionTypes.setGroupMsgInfo:
      return { ...state, groupMessageInfo: action.payload };
    case ActionTypes.setSelectedInfoMsg:
      const selectedMsg = state.groupMessages?.find(
        msg => msg._id === action.payload
      );
      return { ...state, selectedInfoMsg: selectedMsg! };
    default:
      return state;
  }
};
