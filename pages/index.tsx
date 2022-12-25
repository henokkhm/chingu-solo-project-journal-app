import Cookies from "cookies";
import type { NextApiRequest, NextApiResponse } from "next";
import { useRouter } from "next/router";
import { FC } from "react";

import Header from "../components/header";
import JournalForm from "../components/forms/journal-form";
import JournalsWrapper from "../components/journals-wrapper";
import { getAuthenticatedUser } from "../utils/auth-helpers";
import { getAllJounalsOfUser } from "../data-layer/journal";
import { JournalType } from "../types/journal";

interface HomeProps {
  journals: JournalType[];
}

const Home: FC<HomeProps> = ({ journals }) => {
  const router = useRouter();

  const refreshData = () => {
    router.replace(router.asPath);
  };

  return (
    <>
      <Header pageTitle={"Create a Note"} />
      <main className="flex flex-col gap-16">
        <p className="leading-6 text-gray-800">
          Use the form below to create a journal. Make sure that you fill the
          required title and body fields.
        </p>

        <JournalForm submitUrl="/api/journals/create" onSuccess={refreshData} />
        <JournalsWrapper journalArray={journals} />
      </main>
    </>
  );
};

export async function getServerSideProps({
  req,
  res,
}: {
  req: NextApiRequest;
  res: NextApiResponse;
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

  const data = await getAllJounalsOfUser(authenticatedUserName);

  return {
    props: { journals: data.documents },
  };
}

export default Home;
