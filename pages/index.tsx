import Head from "next/head";
import { Inter } from "@next/font/google";
import PrimaryButton from "../components/buttons/primary-button";
import SecondaryButton from "../components/buttons/secondary-button";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
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
      <main>
        <h1 className="min-w-screen pt-4 text-center text-3xl font-bold underline">
          Hello Chingu!
        </h1>
        <div className="flex min-h-screen flex-col items-center justify-center space-y-8">
          <PrimaryButton text="Sign up" />
          <PrimaryButton danger text="Delete  " />
          <SecondaryButton text="Edit" />
          <SecondaryButton danger text="Delete" />
        </div>
      </main>
    </>
  );
}
