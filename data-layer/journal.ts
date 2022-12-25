import { baseUrl, fetchBody, fetchOptions } from "../utils/mongo-db-utils";

export async function getAllJounalsOfUser(username: string) {
  // @ts-ignore
  const journalData = await fetch(`${baseUrl}/find`, {
    ...fetchOptions,
    body: JSON.stringify({
      ...fetchBody,
      collection: "journals",
      filter: { createdBy: username },
    }),
  });
  return await journalData.json();
}

export async function getJournalByIdFromDB(id: string) {
  // @ts-ignore
  const journalData = await fetch(`${baseUrl}/findOne`, {
    ...fetchOptions,
    body: JSON.stringify({
      ...fetchBody,
      collection: "journals",
      filter: { _id: { $oid: id } },
    }),
  });
  return await journalData.json();
}

export async function saveJournalToDb(
  createdBy: string,
  title: string,
  body: string
) {
  // @ts-ignore
  const insertJournal = await fetch(`${baseUrl}/insertOne`, {
    ...fetchOptions,
    body: JSON.stringify({
      ...fetchBody,
      collection: "journals",
      document: {
        createdBy,
        title,
        body,
      },
    }),
  });

  return await insertJournal.json();
}

export async function deleteJournalFromDb(id: string) {
  // @ts-ignore
  const deleteJournal = await fetch(`${baseUrl}/deleteOne`, {
    ...fetchOptions,
    body: JSON.stringify({
      ...fetchBody,
      collection: "journals",
      filter: { _id: { $oid: id } },
    }),
  });
  return await deleteJournal.json();
}

export async function updateJournalInDb(
  id: string,
  title: string,
  body: string
) {
  // @ts-ignore
  const updateJournal = await fetch(`${baseUrl}/updateOne`, {
    ...fetchOptions,
    body: JSON.stringify({
      ...fetchBody,
      collection: "journals",
      filter: { _id: { $oid: id } },
      update: {
        $set: {
          title,
          body,
        },
      },
    }),
  });
  return await updateJournal.json();
}
