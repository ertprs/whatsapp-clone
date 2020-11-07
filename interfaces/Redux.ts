import { FormStateMap } from "redux-form";
import { UserState } from "../redux/reducers/userReducer";

export interface Redux {
  form: FormStateMap;
  user: UserState;
}
