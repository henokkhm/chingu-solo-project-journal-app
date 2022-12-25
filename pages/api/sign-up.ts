import type { NextApiRequest, NextApiResponse } from "next";
import Cookies from "cookies";

import { getPasswordHash } from "../../utils/bcrypt-utils";
import { getUserByUsernameFromDB, writeUserToDB } from "../../data-layer/user";
import { getAuthenticatedUser } from "../../utils/auth-helpers";

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
        const cookies = new Cookies(req, res);
        const sessionId = cookies.get("sessionId");
        const { authenticated } = await getAuthenticatedUser(sessionId);

        if (authenticated) {
          return res.status(400).json({
            message:
              "You are already signed in. Please sign out to create a new account",
          });
        }

        const newUser = req.body;

        // Validate the user data
        if (!newUser) {
          return res
            .status(400)
            .json({ message: "Missing username and password" });
        }
        if (!newUser.userName) {
          return res.status(400).json({ message: "Missing username" });
        }

        if (!newUser.password) {
          return res.status(400).json({ message: "Missing password" });
        }

        // check if username is available by querying the database
        const previouslyRegisteredUser = await getUserByUsernameFromDB(
          newUser.userName
        );

        if (previouslyRegisteredUser.document) {
          return res.status(400).json({ message: "Username is already taken" });
        }

        // save new user and hashed password to database
        const passwordHash = await getPasswordHash(newUser.password);
        await writeUserToDB(newUser.userName, passwordHash);

        return res.status(201).json({
          message: "Success: A new user has been created",
        });
        break;
      default:
        return res.status(405).json({ message: "Method not supported" });
    }
  } catch (e) {
    console.log("Error in sign up handler", e);
    return res.status(500).json({ message: "Internal server error" });
  }
}
