"use client";
import { authClient } from "@/lib/auth-client";
import {
  ArrowRight,
  Loader,
  Lock,
  ShieldCheck,
  Sparkles,
  Wallet,
} from "lucide-react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import React, { useState } from "react";

export default function SignIn() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();
  const searchParams = useSearchParams();
  const rawCallback = searchParams.get("callbackUrl");
  const callbackURL = rawCallback && rawCallback.startsWith("/") ? rawCallback : "/dashboard";

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    try {
      const formData = new FormData(e.currentTarget);
      const email = formData.get("email") as string;
      const password = formData.get("password") as string;
      await authClient.signIn.email(
        { email, password, callbackURL },
        {
          onRequest: () => {},
          onSuccess: () => {
            router.push(callbackURL);
            router.refresh();
          },
          onError: (ctx) => {
            setError(ctx.error.message);
            setIsLoading(false);
          },
        }
      );
    } catch {
      setError("An unexpected error occurred");
      setIsLoading(false);
    }
  }

  async function handleGoogleSignIn() {
    setIsLoading(true);
    setError("");
    try {
      await authClient.signIn.social(
        { provider: "google", callbackURL },
        {
          onRequest: () => {},
          onSuccess: () => {
            router.push(callbackURL);
            router.refresh();
          },
          onError: (ctx) => {
            setError(ctx.error.message);
            setIsLoading(false);
          },
        }
      );
    } catch {
      setError("Google sign-in failed");
      setIsLoading(false);
    }
  }

  return (
    <div className="min-h-screen grid grid-cols-1 lg:grid-cols-[1fr_1.05fr] bg-background">
        {/* LEFT — FORM */}
        <div className="relative flex flex-col px-6 py-8 sm:px-10 lg:px-16">
          {/* Top bar */}
          <div className="flex items-center justify-between">
            <Link href="/" className="flex items-center gap-2.5 group">
              <div className="size-8 rounded-lg bg-gradient-to-br from-primary to-teal-900 flex items-center justify-center shadow-sm shadow-primary/30">
                <Wallet className="size-4 text-white" />
              </div>
              <span className="font-semibold text-lg tracking-tight">
                Expensify
              </span>
            </Link>
            <Link
              href="/sign-up"
              className="text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              Create account →
            </Link>
          </div>

          {/* Form card */}
          <div className="flex-1 flex items-center justify-center">
            <div className="w-full max-w-md">
              <div className="mb-8">
                <h1 className="text-3xl sm:text-4xl font-semibold tracking-tight mb-2">
                  Welcome back
                </h1>
                <p className="text-muted-foreground">
                  Sign in to your Expensify account to continue.
                </p>
              </div>

              {/* Google */}
              <button
                type="button"
                onClick={handleGoogleSignIn}
                disabled={isLoading}
                className="w-full flex items-center justify-center gap-3 border border-border bg-card hover:bg-secondary/70 rounded-xl px-4 py-3 mb-5 font-medium text-sm transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <svg className="size-5" viewBox="0 0 24 24">
                  <path
                    fill="#4285F4"
                    d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                  />
                  <path
                    fill="#34A853"
                    d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                  />
                  <path
                    fill="#FBBC05"
                    d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                  />
                  <path
                    fill="#EA4335"
                    d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                  />
                </svg>
                {isLoading ? (
                  <span className="inline-flex items-center gap-2">
                    <Loader className="animate-spin size-4" /> Signing in...
                  </span>
                ) : (
                  "Continue with Google"
                )}
              </button>

              {/* Divider */}
              <div className="relative mb-5">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-border" />
                </div>
                <div className="relative flex justify-center text-xs uppercase tracking-wider">
                  <span className="px-3 bg-background text-muted-foreground">
                    or with email
                  </span>
                </div>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium text-foreground mb-1.5"
                  >
                    Email
                  </label>
                  <input
                    id="email"
                    type="email"
                    name="email"
                    required
                    disabled={isLoading}
                    autoComplete="email"
                    placeholder="you@example.com"
                    className="w-full bg-card border border-border rounded-xl px-4 py-3 text-sm placeholder:text-muted-foreground/60 focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition disabled:opacity-50"
                  />
                </div>

                <div>
                  <div className="flex items-center justify-between mb-1.5">
                    <label
                      htmlFor="password"
                      className="block text-sm font-medium text-foreground"
                    >
                      Password
                    </label>
                    <a
                      href="#"
                      className="text-xs text-primary hover:text-primary/80 font-medium"
                    >
                      Forgot?
                    </a>
                  </div>
                  <input
                    id="password"
                    type="password"
                    name="password"
                    required
                    disabled={isLoading}
                    autoComplete="current-password"
                    placeholder="••••••••"
                    className="w-full bg-card border border-border rounded-xl px-4 py-3 text-sm placeholder:text-muted-foreground/60 focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition disabled:opacity-50"
                  />
                </div>

                {error && (
                  <div className="text-destructive text-sm bg-destructive/10 border border-destructive/20 rounded-xl px-4 py-3">
                    {error}
                  </div>
                )}

                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full bg-primary hover:bg-primary/90 disabled:bg-primary/50 text-primary-foreground px-4 py-3 rounded-xl font-medium text-sm transition-colors flex items-center justify-center gap-2 shadow-md shadow-primary/20 disabled:cursor-not-allowed"
                >
                  {isLoading ? (
                    <>
                      <Loader className="animate-spin size-4" />
                      Signing in...
                    </>
                  ) : (
                    <>
                      Sign in
                      <ArrowRight className="size-4" />
                    </>
                  )}
                </button>
              </form>

              <p className="text-center text-sm text-muted-foreground mt-8">
                Don't have an account?{" "}
                <Link
                  href="/sign-up"
                  className="text-primary hover:text-primary/80 font-medium hover:underline"
                >
                  Sign up
                </Link>
              </p>

              <p className="mt-8 text-center text-xs text-muted-foreground flex items-center justify-center gap-1.5">
                <Lock className="size-3" />
                Protected by end-to-end encryption
              </p>
            </div>
          </div>
        </div>

        {/* RIGHT — BRAND PANEL */}
        <div className="relative hidden lg:flex items-center justify-center overflow-hidden bg-gradient-to-br from-primary via-teal-800 to-emerald-950">
          <div className="absolute inset-0 opacity-30 bg-[radial-gradient(ellipse_at_top_right,white,transparent_55%)]" />
          <div className="absolute -top-40 -right-40 size-[500px] rounded-full bg-emerald-400/20 blur-3xl" />
          <div className="absolute bottom-0 -left-40 size-[500px] rounded-full bg-teal-300/20 blur-3xl" />

          <div className="relative z-10 max-w-md px-12 text-white">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 backdrop-blur border border-white/20 text-xs font-medium mb-8">
              <Sparkles className="size-3.5" />
              Trusted by 50,000+ people
            </div>
            <h2 className="text-4xl font-semibold tracking-tight leading-tight mb-6">
              Finance that feels calm, not chaotic.
            </h2>
            <p className="text-white/80 text-lg leading-relaxed mb-10">
              Your accounts, transactions and insights — unified in one
              beautifully quiet workspace.
            </p>

            <ul className="space-y-4">
              {[
                { icon: ShieldCheck, t: "Bank-grade security" },
                { icon: Sparkles, t: "AI-powered categories" },
                { icon: Lock, t: "Private by default" },
              ].map((f) => (
                <li key={f.t} className="flex items-center gap-3">
                  <div className="size-9 rounded-lg bg-white/10 backdrop-blur border border-white/20 flex items-center justify-center">
                    <f.icon className="size-4 text-white" />
                  </div>
                  <span className="text-white/90">{f.t}</span>
                </li>
              ))}
            </ul>

            <figure className="mt-12 pt-8 border-t border-white/15">
              <blockquote className="text-white/90 text-sm leading-relaxed mb-4">
                "Switched from three spreadsheets to Expensify. Saved me $300 a
                month in invisible spending."
              </blockquote>
              <figcaption className="flex items-center gap-3">
                <div className="size-9 rounded-full bg-white/20 text-white flex items-center justify-center text-sm font-semibold">
                  P
                </div>
                <div>
                  <p className="text-sm font-medium text-white">Priya S.</p>
                  <p className="text-xs text-white/60">Product Designer</p>
                </div>
              </figcaption>
            </figure>
          </div>
        </div>
      </div>
  );
}
