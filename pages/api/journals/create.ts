import type { NextApiRequest, NextApiResponse } from "next";
import Cookies from "cookies";

type Data = {
  message: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const cookies = new Cookies(req, res);
  const sessionId = cookies.get("sessionId");
  console.log(`the session id i got back is ${sessionId}`);

  try {
    switch (req.method) {
      case "POST":
        const cookies = new Cookies(req, res);
        cookies.set("sessionId");
        return res.status(200).json({ message: "Successfully signed out" });

      default:
        return res.status(405).json({ message: "Method not supported" });
    }
  } catch (e) {
    console.log("Error in sign in handler", e);
    return res.status(500).json({ message: "Internal server error" });
  }
}
