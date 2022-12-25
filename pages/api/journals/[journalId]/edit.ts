import type { NextApiRequest, NextApiResponse } from "next";
import Cookies from "cookies";

import { getAuthenticatedUser } from "../../../../utils/auth-helpers";
import {
  getJournalByIdFromDB,
  updateJournalInDb,
} from "../../../../data-layer/journal";

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

        // check if user owns this journal before they're allowed to update it
        const { journalId } = req.query;
        // @ts-ignore
        const item = await getJournalByIdFromDB(journalId);
        const journal = item.document;

        if (!journal) {
          return res.status(400).json({ message: "Journal not found!" });
        }

        if (journal.createdBy !== authenticatedUserName) {
          return res
            .status(401)
            .json({ message: "You are not authorized to update this journal" });
        }

        // @ts-ignore
        await updateJournalInDb(journalId, data.journalTitle, data.journalBody);

        return res.status(200).json({ message: "Journal updated sucessfully" });
        break;
      default:
        return res.status(405).json({ message: "Method not supported" });
    }
  } catch (e) {
    console.log("Error in edit journal handler", e);
    return res.status(500).json({ message: "Internal server error" });
  }
}
