import Axios from "axios";

export const axios =
  process.env.NODE_ENV === "development"
    ? Axios.create({
        baseURL: "http://localhost:3000"
      })
    : Axios.create({
        baseURL: "whatsapp-web.now.sh"
      });
