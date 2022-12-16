import Image from "next/image";
import { FC, MouseEventHandler } from "react";

interface ButtonProps {
  text: string;
  iconUrl?: string;
  danger?: boolean;
  onClick?: MouseEventHandler;
}

const PrimaryButton: FC<ButtonProps> = ({ text, iconUrl, danger, onClick }) => {
  const colors = danger
    ? "bg-custom-red hover:bg-custom-red-hover focus:ring-red-300"
    : "bg-custom-blue hover:bg-custom-blue-hover focus:ring-blue-300";

  return (
    <button onClick={onClick} type="button" className={`btn-styles ${colors}`}>
      {iconUrl && (
        <Image src={iconUrl} className="mr-2" alt="" width="16" height="16" />
      )}
      {text}
    </button>
  );
};

export default PrimaryButton;
