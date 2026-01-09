
import { Wallet } from "lucide-react";
import Link from "next/link";
import React from "react";

export default function HeaderLogo() {


  return (
    <Link href="/">
      <div className="items-center hidden lg:flex">
        <Wallet className="fill-primary/60 text-primary h-6 w-6" />
        <p className="font-semibold  text-primary text-2xl ml-2.5">Expensify</p>
      </div>
    </Link>
  );
}
