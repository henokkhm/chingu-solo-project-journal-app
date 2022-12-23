import "../styles/globals.css";
import type { AppProps } from "next/app";
import Layout from "../components/layout";

import { SnackbarProvider } from "../context/snackbar-context";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <SnackbarProvider>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </SnackbarProvider>
    </>
  );
}
