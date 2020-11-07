import { User } from "../../interfaces/User";
import { FetchUserAction } from "../actions";
import { ActionTypes } from "../actions/types";

type Action = FetchUserAction;

export const userReducer = (contacts: User[] | null = null, action: Action) => {
  switch (action.type) {
    case ActionTypes.fetchUsers:
      return action.payload;
    default:
      return contacts;
  }
};
