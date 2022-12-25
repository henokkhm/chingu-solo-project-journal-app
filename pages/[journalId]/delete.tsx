import Link from "next/link";
import { useRouter } from "next/router";
import { FC } from "react";

import PrimaryButton from "../../components/buttons/primary-button";
import Header from "../../components/header";
import { useSnackbar } from "../../context/snackbar-context";

interface DeleteJournalProps {
  id: string;
}

const DeleteJournal: FC<DeleteJournalProps> = () => {
  const router = useRouter();
  const { journalId } = router.query;

  const { setSnackbarMessage } = useSnackbar();

  const handleDelete = async () => {
    try {
      const response = await fetch(`/api/journals/${journalId}/delete`, {
        method: "DELETE",
      });

      await response.json();

      if (response.status === 200) {
        setSnackbarMessage("Your journal has been deleted!", "success");
        router.push("/");
      } else if (response.status === 401) {
        setSnackbarMessage("You should log in first!", "error");
        router.push("/sign-in");
      }
    } catch (err) {
      console.log("Unknown error: ", err);
    }
  };

  return (
    <>
      <Header pageTitle={"Delete Note"} />
      <main className="flex flex-col gap-4">
        <p>Are you sure you want to delete this note?</p>
        <div className="flex flex-col space-y-2 custom-sm-2:flex-row custom-sm-2:space-y-0 custom-sm-2:space-x-3">
          <PrimaryButton
            onClick={handleDelete}
            text="Yes"
            iconUrl="/svg-icons/trash-white.svg"
          />
          <Link href="/">
            <PrimaryButton danger text="No" iconUrl="/svg-icons/go-back.svg" />
          </Link>
        </div>
      </main>
    </>
  );
};

export default DeleteJournal;
