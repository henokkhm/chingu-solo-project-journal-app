import { FC } from "react";
import JournalForm from "../../components/forms/journal-form";
import Header from "../../components/header";
import { JournalType } from "../../types/journal";

const EditJournal: FC<JournalType> = ({ id }) => {
  return (
    <>
      <Header pageTitle={"Edit Note"} />
      <main className="flex flex-col gap-16"></main>
      <JournalForm />
    </>
  );
};

export default EditJournal;
