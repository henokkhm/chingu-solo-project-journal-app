import type { NextApiRequest, NextApiResponse } from "next";

import { getPasswordHash } from "../../utils/bcrypt-utils";
import { getUserByUsernameFromDB, writeUserToDB } from "../../data-layer/user";

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
        // TODO: Check user is NOT signed in. Only signed out users can create a new user

        // Grab the user object
        const newUser = req.body;

        // Validate the user data
        if (!newUser) {
          return res
            .status(400)
            .json({ message: "Missing username and password" });
        }
        if (!newUser.username) {
          return res.status(400).json({ message: "Missing username" });
        }

        if (!newUser.password) {
          return res.status(400).json({ message: "Missing password" });
        }

        // check if username is available by querying the database
        const previouslyRegisteredUser = await getUserByUsernameFromDB(
          newUser.username
        );

        if (previouslyRegisteredUser.document) {
          return res.status(400).json({ message: "Username is already taken" });
        }

        // save new user and hashed password to database
        const passwordHash = await getPasswordHash(newUser.password);
        await writeUserToDB(newUser.username, passwordHash);

        return res.status(200).json({
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
