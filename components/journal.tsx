import { FC } from "react";
import { JournalType } from "../types/journal";
import SecondaryButton from "./buttons/secondary-button";

const Journal: FC<JournalType> = ({ title, body, id }) => {
  return (
    <div className="mb-6 w-full min-w-[250px] rounded border">
      <div className="rounded-t bg-[#4A688E] p-4">
        <h2 className="font-bold text-white">{title}</h2>
      </div>
      <div className="p-4 pb-8 text-gray-600">{body}</div>
      <div className="flex items-center justify-between rounded-b bg-[#F3F7FB] align-bottom">
        <SecondaryButton text="Edit" iconUrl="/svg-icons/pencil.svg" />
        <SecondaryButton danger text="Delete" iconUrl="/svg-icons/trash.svg" />
      </div>
    </div>
  );
};

export default Journal;
