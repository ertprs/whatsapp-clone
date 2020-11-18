import { Message } from "../../interfaces/Message";
import { AnyAction } from "redux";
import { ActionTypes } from "../actions/types";
import { FetchLastMsg } from "../../pages";
import {
  AddNewMessage,
  FetchMessages,
  FilterRecentChats,
  SetDisplay,
  ToggleSearchMessage,
  UpdateLastMsg,
  UpdateRead,
  UpdateSecondTick
} from "../actions";
import { User } from "../../interfaces/User";

export interface MessageState {
  lastMsgs: Message[] | [] | null;
  messages:
    | Message[]
    | []
    | null
    | {
        message: string | null;
        to: User;
        from: User;
        createdAt: string;
      }[];
  messagesLoading: boolean;
  filteredRecentChats: Message[] | [] | null;
  display: boolean;
  showSearchMessage: boolean;
}

const INITIAL_STATE: MessageState = {
  lastMsgs: null,
  messages: null,
  messagesLoading: false,
  filteredRecentChats: null,
  display: false,
  showSearchMessage: false
};

type Action =
  | FetchLastMsg
  | FetchMessages
  | AddNewMessage
  | UpdateLastMsg
  | FilterRecentChats
  | UpdateRead
  | UpdateSecondTick
  | SetDisplay
  | ToggleSearchMessage;

export const messageReducer = (
  state = INITIAL_STATE,
  action: Action
): MessageState => {
  switch (action.type) {
    case ActionTypes.fetchLastMsg:
      return {
        ...state,
        lastMsgs: action.payload,
        filteredRecentChats: action.payload
      };
    case ActionTypes.fetchMessages:
      return { ...state, messages: action.payload as MessageState["messages"] };
    case ActionTypes.addNewMessage:
      if (
        action.payload.to._id.toString() !==
          action.currentContact?._id.toString() &&
        action.payload.from._id.toString() !==
          action.currentContact?._id.toString()
      ) {
        return state;
      }
      if (
        action.payload.to._id.toString() !==
          action.currentUser?._id.toString() &&
        action.payload.from._id.toString() !==
          action.currentUser?._id.toString()
      ) {
        return state;
      }
      const msgs = [...state.messages];
      const newMessageExistIdx = state.messages!.findIndex(
        msg => msg.createdAt.toString() === action.payload.createdAt.toString()
      );
      if (newMessageExistIdx !== -1) {
        msgs[newMessageExistIdx] = action.payload;
        return { ...state, messages: msgs };
      }
      if (!state.messages) {
        return {
          ...state,
          messages: [action.payload]
        };
      }

      return {
        ...state,
        messages: [...state.messages, action.payload]
      };
    case ActionTypes.updateLastMsg:
      const newMsgs = [...state.lastMsgs];

      const filteredItems = newMsgs.filter(
        msg => msg._id!.toString() !== action.payload._id!.toString()
      );
      if (filteredItems.length !== 0) {
        return {
          ...state,
          lastMsgs: [action.payload, ...filteredItems],
          filteredRecentChats: [action.payload, ...filteredItems]
        };
      }
      return {
        ...state,
        lastMsgs: [action.payload],
        filteredRecentChats: [action.payload]
      };
    case ActionTypes.messagesLoadingStart:
      return { ...state, messagesLoading: true };
    case ActionTypes.messagesLoadingStop:
      return { ...state, messagesLoading: false };
    case ActionTypes.filterRecentChats:
      const chats = state.lastMsgs?.filter(msg => {
        const name = `${msg.to.firstName.toLocaleLowerCase()}${msg.to.lastName.toLowerCase()}`;
        return name.toLowerCase().includes(action.payload.toLowerCase());
      }) as Message[] | [];
      return { ...state, filteredRecentChats: chats };
    case ActionTypes.updateRead:
      const stateMsgs = [...state.messages];
      action.payload.forEach(msg => {
        const msgIndx = (state.messages as Message[]).findIndex(
          m => m._id?.toString() === msg._id?.toString()
        );
        if (msgIndx !== -1) {
          stateMsgs[msgIndx] = msg;
        }
      });
      return { ...state, messages: stateMsgs };
    case ActionTypes.updateSecondTick:
      const stateSTickMsgs = [...state.messages];
      action.payload.forEach(msg => {
        const msgIndx = (state.messages as Message[]).findIndex(
          m => msg._id && msg._id?.toString() === m._id?.toString()
        );
        if (msgIndx !== -1) {
          stateSTickMsgs[msgIndx] = msg;
        }
      });
      return { ...state, messages: stateSTickMsgs };
    case ActionTypes.setDisplay:
      return { ...state, display: action.payload };
    case ActionTypes.toggleSearchMessage:
      return { ...state, showSearchMessage: action.payload };
    default:
      return state;
  }
};
