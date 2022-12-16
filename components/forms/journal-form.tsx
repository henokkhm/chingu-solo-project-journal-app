import Link from "next/link";
import PrimaryButton from "../buttons/primary-button";

function JournalForm() {
  return (
    <form className="form-styles w-full">
      <div>
        <label htmlFor="journalTitle" className="label-styles">
          Title
        </label>
        <input type="text" id="journalTitle" className="input-styles" />
      </div>
      <div>
        <label
          htmlFor="journalBody"
          className="mb-2 block font-medium text-gray-900"
        >
          Body
        </label>
        <textarea
          rows={5}
          id="journalBody"
          className="block w-full rounded-lg border border-gray-300  bg-gray-50  p-2.5 text-gray-900  "
        />
      </div>
      <div className="flex flex-col space-y-2 custom-sm:flex-row custom-sm:space-y-0 custom-sm:space-x-3">
        <PrimaryButton
          text="Save Journal"
          iconUrl="/svg-icons/floppy-disk.svg"
        />
        <Link href="/">
          <PrimaryButton
            danger
            text="Discard"
            iconUrl="/svg-icons/go-back.svg"
            onClick={
              () =>
                console.log(
                  "I got clickd"
                ) /* TODO: reset entered values to empty strings */
            }
          />
        </Link>
      </div>
    </form>
  );
}

export default JournalForm;
