import axios from "axios";
import { config } from "../utils/config";

export const harperGetMessages = (room: string) => {
  if (config === null) return null;

  const data = JSON.stringify({
    operation: "sql",
    sql: `SELECT * FROM realtime_chat_app.messages WHERE room = '${room}' LIMIT 100`,
  });

  const dataConfig = { ...config, data };

  return new Promise((resolve, reject) => {
    axios(dataConfig)
      .then((response) => resolve(JSON.stringify(response.data)))
      .catch((error) => reject(error));
  });
};
