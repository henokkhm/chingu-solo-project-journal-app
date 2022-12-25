import SecondaryButton from "./buttons/secondary-button";
import { FC } from "react";
import { useRouter } from "next/router";
import { useSnackbar } from "../context/snackbar-context";
interface HeaderProps {
  pageTitle: string;
}

const Header: FC<HeaderProps> = ({ pageTitle }) => {
  const router = useRouter();
  const { setSnackbarMessage } = useSnackbar();

  const handleSignOut = async () => {
    try {
      const response = await fetch("/api/sign-out", {
        method: "DELETE",
      });

      const jsonData = await response.json();

      if (
        response.status === 200 &&
        jsonData.message === "Successfully signed out"
      ) {
        setSnackbarMessage("You have successfully loged out!", "success");
        router.push("/sign-in");
      }
    } catch (err) {
      console.log("Unknown error ", err);
    }
  };
  return (
    <header className="mb-12 flex flex-col justify-between border-b border-gray-300 pb-4 custom-sm:flex-row">
      <div className="flex flex-col">
        <h1 className="min-w-screen pt-4 text-center text-3xl font-bold ">
          Digital Journal
        </h1>
        <h2 className="pt-2 text-center text-xl custom-sm:text-left">
          {pageTitle}
        </h2>
      </div>

      <div className="flex justify-center">
        <SecondaryButton
          onClick={handleSignOut}
          text="Sign out"
          iconUrl="/svg-icons/leave.svg"
        />
      </div>
    </header>
  );
};

export default Header;
