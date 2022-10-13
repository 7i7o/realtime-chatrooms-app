import axios from "axios";
import { config } from "../utils/config";

export const harperSaveMessage = (
  message: string,
  username: string,
  room: string,
  __createdtime__: number
) => {
  if (config === null) return null;

  const data = JSON.stringify({
    operation: "insert",
    schema: "realtime_chat_app",
    table: "messages",
    records: [{ message, username, room }],
  });

  const dataConfig = { ...config, data };

  return new Promise((resolve, reject) => {
    axios(dataConfig)
      .then((response) => resolve(JSON.stringify(response.data)))
      .catch((error) => reject(error));
  });
};
