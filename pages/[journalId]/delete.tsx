import Link from "next/link";
import { FC } from "react";

import PrimaryButton from "../../components/buttons/primary-button";
import Header from "../../components/header";

interface DeleteJournalProps {
  id: string;
}

const DeleteJournal: FC<DeleteJournalProps> = ({ id }) => {
  return (
    <>
      <Header pageTitle={"Delete Note"} />
      <main className="flex flex-col gap-4">
        <p>Are you sure you want to delete this note?</p>
        <div className="flex flex-col space-y-2 custom-sm-2:flex-row custom-sm-2:space-y-0 custom-sm-2:space-x-3">
          <PrimaryButton text="Yes" iconUrl="/svg-icons/trash-white.svg" />
          <Link href="/">
            <PrimaryButton danger text="No" iconUrl="/svg-icons/go-back.svg" />
          </Link>
        </div>
      </main>
    </>
  );
};

export default DeleteJournal;
