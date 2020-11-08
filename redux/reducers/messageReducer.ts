import { Message } from "../../interfaces/Message";
import { AnyAction } from "redux";

export interface MessageState {
  lastMsgs: Message[] | [] | null;
}

const INITIAL_STATE: MessageState = {
  lastMsgs: null
};

export const messageReducer = (state = INITIAL_STATE, action: AnyAction) => {
  switch (action.type) {
    default:
      return state;
  }
};
