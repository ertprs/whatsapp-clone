import { User } from "../interfaces/User";
import React from "react";

export const Users = React.createContext<User[] | null | []>(null);
