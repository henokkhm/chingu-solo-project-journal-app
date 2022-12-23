import Image from "next/image";
import { FC, MouseEventHandler } from "react";

interface ButtonProps {
  text: string;
  iconUrl?: string;
  danger?: boolean;
  loading?: boolean;
  onClick?: MouseEventHandler;
}

const PrimaryButton: FC<ButtonProps> = ({
  text,
  iconUrl,
  danger,
  loading,
  onClick,
}) => {
  const colors = danger
    ? "bg-custom-red hover:bg-custom-red-hover focus:ring-red-300"
    : loading
    ? "bg-gray-200"
    : "bg-custom-blue hover:bg-custom-blue-hover focus:ring-blue-300";

  return (
    <button
      onClick={onClick}
      type="button"
      disabled={loading}
      className={`btn-styles ${colors}`}
    >
      <div className={`${loading && "invisible"} flex gap-2 `}>
        {iconUrl && (
          <Image src={iconUrl} className="mr-2" alt="" width="16" height="16" />
        )}
        {text}
      </div>
      {loading && (
        <Image
          className="absolute mr-2 h-8 w-8 animate-spin fill-blue-600 text-gray-200 dark:text-gray-600"
          src="/svg-icons/spinner.svg"
          width="16"
          height="16"
          alt="loading..."
        />
      )}
    </button>
  );
};

export default PrimaryButton;
