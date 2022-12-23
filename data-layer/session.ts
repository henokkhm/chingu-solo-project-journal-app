import { baseUrl, fetchBody, fetchOptions } from "../utils/mongo-db-utils";

export async function getSessionByIdFromDB(sessionId: string) {
  // @ts-ignore
  const sessionData = await fetch(`${baseUrl}/findOne`, {
    ...fetchOptions,
    body: JSON.stringify({
      ...fetchBody,
      collection: "sessions",
      filter: { id: sessionId },
    }),
  });
  return await sessionData.json();
}

export async function writeSessionToDB(sessionId: string, username: string) {
  // @ts-ignore
  const insertSession = await fetch(`${baseUrl}/insertOne`, {
    ...fetchOptions,
    body: JSON.stringify({
      ...fetchBody,
      collection: "sessions",
      document: {
        sessionId,
        username,
      },
    }),
  });

  return await insertSession.json();
}
