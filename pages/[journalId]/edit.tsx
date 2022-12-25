import { NextApiRequest, NextApiResponse } from "next";
import { FC } from "react";
import Cookies from "cookies";
import { useRouter } from "next/router";

import JournalForm from "../../components/forms/journal-form";
import Header from "../../components/header";
import { JournalType } from "../../types/journal";
import { getAuthenticatedUser } from "../../utils/auth-helpers";
import { getJournalByIdFromDB } from "../../data-layer/journal";

const EditJournal: FC<{ journal: JournalType }> = ({ journal }) => {
  const router = useRouter();
  return (
    <>
      <Header pageTitle={"Edit Note"} />
      <main className="flex flex-col gap-16"></main>
      <JournalForm
        submitUrl={`/api/journals/${router.query.journalId}/edit`}
        title={journal.title}
        body={journal.body}
        onSuccess={() => router.push("/")}
      />
    </>
  );
};

export async function getServerSideProps({
  req,
  res,
  params,
}: {
  req: NextApiRequest;
  res: NextApiResponse;
  params: { journalId: string };
}) {
  const cookies = new Cookies(req, res);
  const sessionId = cookies.get("sessionId");

  const { authenticated, authenticatedUserName } = await getAuthenticatedUser(
    sessionId
  );

  if (!authenticated) {
    return {
      redirect: {
        permanent: false,
        destination: "/login",
      },
      props: {},
    };
  }

  const data = await getJournalByIdFromDB(params.journalId);

  return {
    props: { journal: data.document },
  };
}

export default EditJournal;
