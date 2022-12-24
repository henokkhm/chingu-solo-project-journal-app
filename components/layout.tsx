import Head from "next/head";
import { useSnackbar } from "../context/snackbar-context";
import Snackbar from "./snackbar";

interface LayoutProps {
  children: React.ReactNode;
}

function Layout({ children }: LayoutProps) {
  const { snackbar } = useSnackbar();
  return (
    <>
      <Head>
        <title>Chingu Solo Project - Journal App</title>
        <meta
          name="description"
          content="This is a simple journal app for my first Chingu solo project."
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <>{children}</>
      {snackbar.message.length > 0 && <Snackbar {...snackbar} />}
    </>
  );
}

export default Layout;
