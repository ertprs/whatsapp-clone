import { Message } from "../../interfaces/Message";
import { AnyAction } from "redux";
import { ActionTypes } from "../actions/types";
import { FetchLastMsg } from "../../pages";

export interface MessageState {
  lastMsgs: Message[] | [] | null;
}

const INITIAL_STATE: MessageState = {
  lastMsgs: null
};

type Action = FetchLastMsg;

export const messageReducer = (state = INITIAL_STATE, action: Action) => {
  switch (action.type) {
    case ActionTypes.fetchLastMsg:
      return { ...state, lastMsgs: action.payload };
    default:
      return state;
  }
};
