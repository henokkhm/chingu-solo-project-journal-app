import { baseUrl, fetchBody, fetchOptions } from "../utils/mongo-db-utils";

export async function getUserByUsernameFromDB(username: string) {
  // @ts-ignore

  const previouslyRegisteredUserData = await fetch(`${baseUrl}/findOne`, {
    ...fetchOptions,
    body: JSON.stringify({
      ...fetchBody,
      collection: "users",
      filter: { username },
    }),
  });
  return await previouslyRegisteredUserData.json();
}

// TODO: Fix any
export async function writeUserToDB(username: string, passwordHash: any) {
  // @ts-ignore
  const insertUser = await fetch(`${baseUrl}/insertOne`, {
    ...fetchOptions,
    body: JSON.stringify({
      ...fetchBody,
      collection: "users",
      document: {
        username,
        passwordHash,
      },
    }),
  });

  return await insertUser.json();
}
