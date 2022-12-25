import type { NextApiRequest, NextApiResponse } from "next";
import Cookies from "cookies";

import { getAuthenticatedUserName } from "../../../utils/auth-helpers";

type Data = {
  message: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const cookies = new Cookies(req, res);
  const sessionId = cookies.get("sessionId");

  if (!sessionId) {
    return res.status(400).json({ message: "You are not signed in" });
  }

  await getAuthenticatedUserName(sessionId);

  try {
    switch (req.method) {
      case "POST":
        console.log(req.body);

      default:
        return res.status(405).json({ message: "Method not supported" });
    }
  } catch (e) {
    console.log("Error in sign in handler", e);
    return res.status(500).json({ message: "Internal server error" });
  }
}
