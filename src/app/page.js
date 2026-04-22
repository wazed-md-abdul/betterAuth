"use client";
import {HardDrive, Persons} from "@gravity-ui/icons";
import {Button, toast} from "@heroui/react";
import {  Link } from '@heroui/react';

const noop = () => {};

export default function Home() {

  return (
    <>

      <div className="mx-auto container my-3 flex flex-col items-center justify-center my-36 ">
        <h1 className="text-2xl font-bold">Welcome to BetterAuth</h1>
        <p className="text-gray-600 mt-2">
          A better way to handle authentication in your Next.js applications.

        </p>
   
        <Link href="/auth/signup" className="mt-4 inline-flex items-center gap-2 rounded bg-blue-600 px-4 py-2 text-white hover:bg-blue-700">
          Call to action
          <Link.Icon />
        </Link>
        <div className="flex h-full max-w-xl flex-col items-center justify-center">
      <Link href="/auth/signup" className="mt-4 inline-flex items-center gap-2 rounded bg-blue-600 px-4 py-2 text-white hover:bg-blue-700">
        Sign Up
        <Link.Icon />
      </Link>
      <Link href="/auth/signin" className="mt-4 inline-flex items-center gap-2 rounded bg-blue-600 px-4 py-2 text-white hover:bg-blue-700">
        Sign In
        <Link.Icon />
      </Link>
    </div>

     </div>



    </>
  );
}
