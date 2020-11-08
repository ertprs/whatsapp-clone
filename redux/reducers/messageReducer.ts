import { Message } from "../../interfaces/Message";
import { AnyAction } from "redux";
import { ActionTypes } from "../actions/types";
import { FetchLastMsg } from "../../pages";
import { AddNewMessage, FetchMessages } from "../actions";

export interface MessageState {
  lastMsgs: Message[] | [] | null;
  messages: Message[] | [] | null;
}

const INITIAL_STATE: MessageState = {
  lastMsgs: null,
  messages: null
};

type Action = FetchLastMsg | FetchMessages | AddNewMessage;

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
      return { ...state, messages: [...state.messages, action.payload] };
    default:
      return state;
  }
};
