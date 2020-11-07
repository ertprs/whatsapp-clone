import { FormStateMap } from "redux-form";
import { User } from "./User";

export interface Redux {
  form: FormStateMap;
  user: User[] | [] | null;
}
