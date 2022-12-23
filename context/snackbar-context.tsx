import { createContext, ReactNode, useContext, useState } from "react";

interface SnackbarInterface {
  message: string;
  messageType: "success" | "error";
}

interface snackbarContextType {
  snackbar: SnackbarInterface;
  setSnackbarMessage: (
    message: string,
    messageType: "success" | "error"
  ) => void;
}

const snackbarContextDefaultValues: snackbarContextType = {
  snackbar: {
    message: "",
    messageType: "success",
  },
  setSnackbarMessage: () => {},
};

const SnackbarContext = createContext<snackbarContextType>(
  snackbarContextDefaultValues
);

export function useSnackbar() {
  return useContext(SnackbarContext);
}

type Props = {
  children: ReactNode;
};

export function SnackbarProvider({ children }: Props) {
  const [snackbar, setSnackbar] = useState<SnackbarInterface>({
    message: "",
    messageType: "success",
  });

  const setSnackbarMessage = (
    message: string,
    messageType: "success" | "error"
  ) => {
    console.log(
      `setSnackbarMessage called with arguments ${message} and ${messageType}`
    );
    setSnackbar({ message, messageType });
  };

  return (
    <>
      <SnackbarContext.Provider value={{ snackbar, setSnackbarMessage }}>
        {children}
      </SnackbarContext.Provider>
    </>
  );
}
