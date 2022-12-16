import SecondaryButton from "./buttons/secondary-button";
import { FC } from "react";

interface HeaderProps {
  pageTitle: string;
}

const Header: FC<HeaderProps> = ({ pageTitle }) => {
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
        <SecondaryButton text="Sign out" iconUrl="/svg-icons/leave.svg" />
      </div>
    </header>
  );
};

export default Header;
