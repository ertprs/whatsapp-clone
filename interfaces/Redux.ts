import { FormStateMap } from "redux-form";
import { UserState } from "../redux/reducers/userReducer";
import { User } from "./User";

export interface Redux {
  form: FormStateMap;
  user: UserState;
}
