import { Bubblegum_Sans } from "@next/font/google";
import Image from "next/image";
import { FC } from "react";

interface ButtonProps {
  text: string;
  iconUrl?: string;
  danger?: boolean;
}

const PrimaryButton: FC<ButtonProps> = ({ text, iconUrl, danger }) => {
  const colors = danger
    ? "bg-custom-red hover:bg-custom-red-hover focus:ring-red-300"
    : "bg-custom-blue hover:bg-custom-blue-hover focus:ring-blue-300";

  return (
    <button type="button" className={`btn ${colors}`}>
      {iconUrl && (
        <Image src={iconUrl} className="mr-2" alt="" width="10" height="10" />
      )}
      {text}
    </button>
  );
};

export default PrimaryButton;
