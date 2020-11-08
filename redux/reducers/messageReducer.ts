import { Message } from "../../interfaces/Message";
import { AnyAction } from "redux";
import { ActionTypes } from "../actions/types";
import { FetchLastMsg } from "../../pages";
import { AddNewMessage, FetchMessages } from "../actions";

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
      if (!state.messages) {
        let newMessages = state.lastMsgs?.filter(
          msg => msg._id.toString() === action.payload._id.toString()
        );
        if (newMessages?.length !== 0) {
          newMessages = [action.payload, ...newMessages];
          return {
            ...state,
            messages: [action.payload],
            lastMsgs: newMessages
          };
        }

        return {
          ...state,
          messages: [action.payload],
          lastMsgs: [action.payload]
        };
      }

      console.log("reached 0", state.lastMsgs);
      let newMessages = state.lastMsgs?.filter(
        msg => msg._id.toString() === action.payload._id.toString()
      );
      if (newMessages?.length !== 0) {
        console.log("reached 1");
        newMessages = [action.payload, ...newMessages];
        return {
          ...state,
          messages: [...state.messages, action.payload],
          lastMsgs: newMessages
        };
      }
      console.log("reached 2");

      return {
        ...state,
        messages: [...state.messages, action.payload],
        lastMsgs: [action.payload]
      };
    case ActionTypes.messagesLoadingStart:
      return { ...state, messagesLoading: true };
    case ActionTypes.messagesLoadingStop:
      return { ...state, messagesLoading: false };
    default:
      return state;
  }
};
