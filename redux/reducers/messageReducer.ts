import { Message } from "../../interfaces/Message";
import { AnyAction } from "redux";
import { ActionTypes } from "../actions/types";
import { FetchLastMsg } from "../../pages";
import { AddNewMessage, FetchMessages, UpdateLastMsg } from "../actions";

export interface MessageState {
  lastMsgs: Message[] | [] | null;
  messages: Message[] | [] | null;
  messagesLoading: boolean;
}

const INITIAL_STATE: MessageState = {
  lastMsgs: null,
  messages: null,
  messagesLoading: false
};

type Action = FetchLastMsg | FetchMessages | AddNewMessage | UpdateLastMsg;

export const messageReducer = (state = INITIAL_STATE, action: Action) => {
  switch (action.type) {
    case ActionTypes.fetchLastMsg:
      return { ...state, lastMsgs: action.payload };
    case ActionTypes.fetchMessages:
      return { ...state, messages: action.payload };
    case ActionTypes.addNewMessage:
      const newMessageExist = state.messages?.find(
        msg => msg._id.toString() === action.payload._id.toString()
      );
      if (newMessageExist) {
        return state;
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
      const foundIndex = newMsgs.findIndex(
        msg => msg._id.toString() === action.payload._id.toString()
      );
      if (foundIndex !== -1) {
        newMsgs[foundIndex] = action.payload;
        return {
          ...state,
          lastMsgs: newMsgs
        };
      }

      return { ...state, lastMsgs: [action.payload, ...state.lastMsgs] };

    case ActionTypes.messagesLoadingStart:
      return { ...state, messagesLoading: true };
    case ActionTypes.messagesLoadingStop:
      return { ...state, messagesLoading: false };
    default:
      return state;
  }
};
