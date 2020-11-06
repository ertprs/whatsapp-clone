import { User } from "../interfaces/User";
import React from "react";

// export const ContactsContext = React.createContext<User[] | null | []>(null);

export const ContactsContext = React.createContext<{
  contacts: User[] | [] | null;
  setContacts: React.Dispatch<React.SetStateAction<User[] | [] | null>>;
}>({ contacts: null, setContacts: () => {} });
