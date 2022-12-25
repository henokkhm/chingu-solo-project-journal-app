import type { NextApiRequest, NextApiResponse } from "next";
import Cookies from "cookies";

import { getAuthenticatedUser } from "../../../utils/auth-helpers";
import { saveJournalToDb } from "../../../data-layer/journal";

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

        const { authenticated, authenticatedUserName } =
          await getAuthenticatedUser(sessionId);

        if (!authenticated) {
          return res.status(401).json({ message: "You are not signed in" });
        }

        const data = req.body;

        // validate user input
        if (!data) {
          return res
            .status(400)
            .json({ message: "Journal title and body are missing" });
        }

        if (!data.journalTitle) {
          return res.status(400).json({ message: "Journal title is missing" });
        }

        if (!data.journalBody) {
          return res.status(400).json({ message: "Journal body is missing" });
        }

        const DbResponse = await saveJournalToDb(
          authenticatedUserName,
          data.journalTitle,
          data.journalBody
        );

        console.log(`DB response is ${DbResponse}`);

        return res.status(201).json({ message: "Journal created sucessfully" });
        break;
      default:
        return res.status(405).json({ message: "Method not supported" });
    }
  } catch (e) {
    console.log("Error in create journal handler", e);
    return res.status(500).json({ message: "Internal server error" });
  }
}
