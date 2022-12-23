import Image from "next/image";
import { useState, useEffect } from "react";
import { FC } from "react";

interface SnackbarProps {
  message: string;
  messageType: "success" | "error";
}

const Snackbar: FC<SnackbarProps> = ({ message, messageType }) => {
  const [show, setShow] = useState(true);

  useEffect(() => {
    setShow(true);
    const timer = setTimeout(() => {
      setShow(false);
    }, 5000);

    return () => {
      clearTimeout(timer);
    };
  }, [message]);

  if (!show) return null;

  const bgColor = messageType === "success" ? "bg-green-300" : "bg-red-300";

  return (
    <div
      className={` ${bgColor} max-2-lg fixed bottom-4 right-4 mx-auto flex justify-start space-x-6 rounded border-gray-300 px-4 py-2 `}
    >
      <span>{message}</span>
      <Image
        src="/svg-icons/close.svg"
        className="mr-2"
        alt="close snackbar"
        width="12"
        height="12"
        onClick={() => setShow(false)}
      />
    </div>
  );
};

export default Snackbar;
