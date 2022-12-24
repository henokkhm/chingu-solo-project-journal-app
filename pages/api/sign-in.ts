import type { NextApiRequest, NextApiResponse } from "next";
import { v4 as uuidv4 } from "uuid";
import { writeSessionToDB } from "../../data-layer/session";
import { getUserByUsernameFromDB } from "../../data-layer/user";

import { checkPasswordHash } from "../../utils/bcrypt-utils";

type Data = {
  message: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  try {
    switch (req.method) {
      case "POST":
        // TODO: check user is signed out

        // Grab the user object
        const user = req.body;

        // Validate the user data
        if (!user) {
          return res
            .status(400)
            .json({ message: "Missing username and password" });
        }
        if (!user.userName) {
          return res.status(400).json({ message: "Missing username" });
        }

        if (!user.password) {
          return res.status(400).json({ message: "Missing password" });
        }

        // get user from db and compare password hash
        const userFromDB = await getUserByUsernameFromDB(user.userName);
        if (!userFromDB.document) {
          return res
            .status(400)
            .json({ message: "Invalid username or password" });
        }

        if (!(await checkPasswordHash(userFromDB.document, user.password))) {
          return res
            .status(400)
            .json({ message: "Invalid username or password" });
        }

        // create a random sessionId
        const sessionId = uuidv4();

        // add session to sessions collection
        await writeSessionToDB(sessionId, user.userName);

        res
          .status(201)
          .setHeader("Set-Cookie", sessionId)
          .json({ message: "Successfully logged in" });
        break;
      default:
        return res.status(405).json({ message: "Method not supported" });
    }
  } catch (e) {
    console.log("Error in sign in handler", e);
    return res.status(500).json({ message: "Internal server error" });
  }
}
