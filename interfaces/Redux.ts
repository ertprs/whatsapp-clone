import { FormStateMap } from "redux-form";
import { MessageState } from "../redux/reducers/messageReducer";
import { UserState } from "../redux/reducers/userReducer";

export interface Redux {
  form: FormStateMap;
  user: UserState;
  message: MessageState;
}
