"use client";

import React from "react";
import { Bell, Search } from "lucide-react";
import WelcomeMsg from "@/components/welcome-msg";
import { Filters } from "@/components/filters";
import { HeaderUserButton } from "@/components/header-user-button";
import { SidebarTrigger } from "@/components/ui/sidebar";

export default function Header() {
  return (
    <header className="relative overflow-hidden bg-gradient-to-br from-primary via-teal-800 to-emerald-900 px-4 py-6 lg:px-14 pb-28">
      {/* Decorative glow */}
      <div
        aria-hidden
        className="absolute inset-0 opacity-25 bg-[radial-gradient(ellipse_at_top_right,white,transparent_55%)]"
      />
      <div
        aria-hidden
        className="absolute -top-24 -left-24 size-96 rounded-full bg-teal-300/10 blur-3xl"
      />

      <div className="relative max-w-screen-2xl mx-auto">
        {/* Top bar */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-3">
            <SidebarTrigger className="lg:hidden size-8 rounded-lg bg-white/10 hover:bg-white/20 border-white/10 text-white" />
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              className="hidden sm:inline-flex items-center gap-2 h-9 px-3 rounded-full bg-white/10 hover:bg-white/15 border border-white/10 text-white/80 text-sm transition-colors backdrop-blur"
            >
              <Search className="size-4" />
              <span className="hidden md:inline text-xs">Search</span>
              <kbd className="hidden md:inline ml-2 px-1.5 py-0.5 rounded bg-white/10 text-[10px] font-medium">
                ⌘K
              </kbd>
            </button>
            <button
              type="button"
              aria-label="Notifications"
              className="relative size-9 rounded-full bg-white/10 hover:bg-white/15 border border-white/10 text-white flex items-center justify-center transition-colors backdrop-blur"
            >
              <Bell className="size-4" />
              <span className="absolute top-1.5 right-1.5 size-2 rounded-full bg-emerald-400 ring-2 ring-teal-800" />
            </button>
            <HeaderUserButton />
          </div>
        </div>

        <WelcomeMsg />
        <Filters />
      </div>
    </header>
  );
}
