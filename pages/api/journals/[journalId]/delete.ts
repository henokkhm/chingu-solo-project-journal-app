import type { NextApiRequest, NextApiResponse } from "next";
import Cookies from "cookies";

import { getAuthenticatedUser } from "../../../../utils/auth-helpers";
import {
  getJournalByIdFromDB,
  deleteJournalFromDb,
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
      case "DELETE":
        const cookies = new Cookies(req, res);
        const sessionId = cookies.get("sessionId");

        const { authenticated, authenticatedUserName } =
          await getAuthenticatedUser(sessionId);

        if (!authenticated) {
          return res.status(401).json({ message: "You are not signed in" });
        }

        // check if user owns this journal before they're allowed to update it
        const { journalId } = req.query;
        const item = await getJournalByIdFromDB(journalId);
        const journal = item.document;

        if (!journal) {
          return res.status(400).json({ message: "Journal not found!" });
        }

        if (journal.createdBy !== authenticatedUserName) {
          return res
            .status(401)
            .json({ message: "You are not authorized to delete this journal" });
        }

        await deleteJournalFromDb(journalId);

        return res.status(200).json({ message: "Journal deleted sucessfully" });
        break;
      default:
        return res.status(405).json({ message: "Method not supported" });
    }
  } catch (e) {
    console.log("Error in delete journal handler", e);
    return res.status(500).json({ message: "Internal server error" });
  }
}
