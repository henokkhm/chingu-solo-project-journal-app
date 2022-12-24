import Header from "../components/header";
import JournalForm from "../components/forms/journal-form";

import journalData from "../journalData.json";
import JournalsWrapper from "../components/journals-wrapper";

export default function Home() {
  return (
    <>
      <Header pageTitle={"Create a Note"} />
      <main className="flex flex-col gap-16">
        <p className="leading-6 text-gray-800">
          Use the form below to create a journal. Make sure that you fill the
          required title and body fields.
        </p>

        <JournalForm />
        <JournalsWrapper journalArray={journalData} />
      </main>
    </>
  );
}
