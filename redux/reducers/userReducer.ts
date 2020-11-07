import { User } from "../../interfaces/User";
import { AdduserAction, FetchUserAction } from "../actions";
import { ActionTypes } from "../actions/types";

type Action = FetchUserAction | AdduserAction;

export const userReducer = (
  contacts: User[] | [] | null = null,
  action: Action
) => {
  switch (action.type) {
    case ActionTypes.fetchUsers:
      return action.payload;
    case ActionTypes.addUser:
      console.log(contacts);
      return [action.payload, ...contacts];
    default:
      return contacts;
  }
};
