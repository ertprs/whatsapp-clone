import React from "react";
import { withoutAuth } from "../HOCs/withoutAuth";

const login = () => {
  return <div>login</div>;
};

export default withoutAuth(login);
