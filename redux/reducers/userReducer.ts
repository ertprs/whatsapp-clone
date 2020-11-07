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
      const isFound = contacts?.find(
        cont => cont._id.toString() === action.payload._id.toString()
      );
      if (isFound) {
        return [...contacts];
      }
      return [action.payload, ...contacts];
    default:
      return contacts;
  }
};
