import { Message } from "../../interfaces/Message";
import { AnyAction } from "redux";
import { ActionTypes } from "../actions/types";
import { FetchLastMsg } from "../../pages";
import { FetchMessages } from "../actions";

export interface MessageState {
  lastMsgs: Message[] | [] | null;
  messages: Message[] | [] | null;
}

const INITIAL_STATE: MessageState = {
  lastMsgs: null,
  messages: null
};

type Action = FetchLastMsg | FetchMessages;

export const messageReducer = (state = INITIAL_STATE, action: Action) => {
  switch (action.type) {
    case ActionTypes.fetchLastMsg:
      return { ...state, lastMsgs: action.payload };
    case ActionTypes.fetchMessages:
      return { ...state, messages: action.payload };
    default:
      return state;
  }
};
