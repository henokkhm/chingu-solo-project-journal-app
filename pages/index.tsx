import Head from "next/head";
import { Inter } from "@next/font/google";
import PrimaryButton from "../components/buttons/primary-button";
import SecondaryButton from "../components/buttons/secondary-button";
import Journal from "../components/journal";
import SignInForm from "../components/forms/sign-in-form";

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
          <PrimaryButton danger text="Delete" />
          <SignInForm />
          <Journal
            title="Note Title"
            body="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque blandit neque ligula, posuere faucibus sem accumsan eu. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos."
            id="1234"
          />
          <div>
            <label
              htmlFor="user_name"
              className="mb-2 block text-sm font-medium text-gray-900"
            >
              User name:
            </label>
            <input
              type="text"
              id="user_name"
              className="w-full max-w-sm rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-gray-900"
            />
          </div>
          <div>
            <label
              htmlFor="body"
              className="mb-2 block font-medium text-gray-900"
            >
              Body
            </label>
            <textarea
              rows={5}
              id="body"
              className="block w-full rounded-lg border border-gray-300  bg-gray-50  p-2.5 text-gray-900  "
            />
          </div>
        </div>
      </main>
    </>
  );
}
