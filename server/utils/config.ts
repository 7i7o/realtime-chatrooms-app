import dotenv from "dotenv";
dotenv.config();

const dbUrl = process.env.HARPERDB_URL;
const dbPw = process.env.HARPERDB_PW;

export const config =
  !dbUrl || !dbPw
    ? null
    : {
        method: "post",
        url: dbUrl,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Basic ${dbPw}`,
        },
      };
