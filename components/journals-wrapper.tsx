import { FC } from "react";
import Masonry from "react-masonry-css";
import { JournalType } from "../types/journal";
import Journal from "./journal";

interface JournalWrapperProps {
  journalArray: JournalType[];
}

const JournalsWrapper: FC<JournalWrapperProps> = ({ journalArray }) => {
  const masonryBreakpointColumnsObj = {
    default: 3,
    1200: 2,
    720: 1,
  };

  if (!journalArray.length) {
    return (
      <div className="py-4 text-xl font-bold">
        You have no saved journals yet! Please, use the form above to save new
        journals.
      </div>
    );
  }

  return (
    <div>
      <h2 className="pt-2 pb-8 text-center text-3xl font-medium custom-sm:text-left">
        Your Saved Journals
      </h2>
      <Masonry
        breakpointCols={masonryBreakpointColumnsObj}
        className="my-masonry-grid"
        columnClassName="my-masonry-grid_column"
      >
        {journalArray.map((journal) => (
          <Journal
            title={journal.title}
            body={journal.body}
            key={journal._id}
            id={journal.id}
          />
        ))}
      </Masonry>
    </div>
  );
};

export default JournalsWrapper;
