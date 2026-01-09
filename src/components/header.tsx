"use client";

import React from "react";
import HeaderLogo from "@/components/header-logo";
import Navigation from "@/components/navigation";
import UserButton from "@/components/user-button"     
import WelcomeMsg from "@/components/welcome-msg";
import { Filters } from "@/components/filters";

export default function Header() {


  return (
    <header className="bg-gradient-to-b from-primary to-primary/60 px-4 py-8 lg:px-14 pb-24">
      <div className="max-w-screen-2xl mx-auto ">
        <WelcomeMsg />
        <Filters />
      </div>
    </header>
  );
}
