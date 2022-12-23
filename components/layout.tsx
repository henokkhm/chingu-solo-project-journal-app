import { useSnackbar } from "../context/snackbar-context";
import Snackbar from "./snackbar";

interface LayoutProps {
  children: React.ReactNode;
}

function Layout({ children }: LayoutProps) {
  const { snackbar } = useSnackbar();
  return (
    <>
      <>{children}</>
      {snackbar.message.length > 0 && <Snackbar {...snackbar} />}
    </>
  );
}

export default Layout;
