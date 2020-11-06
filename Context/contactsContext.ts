import { User } from "../interfaces/User";
import React from "react";

export const ContactsContext = React.createContext<User[] | null | []>(null);
