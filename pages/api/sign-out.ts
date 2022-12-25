import type { NextApiRequest, NextApiResponse } from "next";
import Cookies from "cookies";

import { deleteSessionFromDb } from "../../data-layer/session";

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
        // TODO: Check user is signed in
        const sessionId = cookies.get("sessionId");

        if (!sessionId) {
          return res.status(400).json({ message: "You are not signed in" });
        }

        await deleteSessionFromDb(sessionId);

        // TODO: Delete session from session collection(db)
        cookies.set("sessionId");
        res.status(200).json({ message: "Successfully signed out" });
        break;
      default:
        return res.status(405).json({ message: "Method not supported" });
    }
  } catch (e) {
    console.log("Error in sign out handler", e);
    return res.status(500).json({ message: "Internal server error" });
  }
}
