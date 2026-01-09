"use client";
import { AuthRoute } from "@/components/AuthRoute";
import { authClient } from "@/lib/auth-client";
import { Loader } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";

export default function SignIn() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    try {
      const formData = new FormData(e.currentTarget);
      const email = formData.get("email") as string;
      const password = formData.get("password") as string;
      console.log(email, password);
      await authClient.signIn.email(
        {
          email,
          password,
          callbackURL: "/",
        },
        {
          onRequest: (ctx) => {
            // Loading state is already handled above
          },
          onSuccess: (ctx) => {
            // Success! The callbackURL will handle the redirect
            setIsLoading(false);
          },
          onError: (ctx) => {
            setError(ctx.error.message);
            setIsLoading(false);
          },
        }
      );
    } catch (err) {
      setError("An unexpected error occurred");
      setIsLoading(false);
    }
  }

  async function handleGoogleSignIn() {
    setIsLoading(true);
    setError("");

    try {
      await authClient.signIn.social(
        {
          provider: "google",
          callbackURL: "/",
        },
        {
          onRequest: (ctx) => {
            // Loading state handled above
          },
          onSuccess: (ctx) => {
            setIsLoading(false);
          },
          onError: (ctx) => {
            setError(ctx.error.message);
            setIsLoading(false);
          },
        }
      );
    } catch (err) {
      setError("Google sign-in failed");
      setIsLoading(false);
    }
  }

  return (
    <AuthRoute>
      <div className="min-h-screen grid grid-cols-1 lg:grid-cols-2 bg-gray-50">
        {/* Left Side - Form */}
        <div className="flex flex-col items-center justify-center px-4 py-8">
          <div className="text-center space-y-2 mb-8">
            <h1 className="font-bold text-4xl text-gray-800">Welcome Back!</h1>
            <p className="text-gray-500">
              Log in or Create account to get back to your dashboard!
            </p>
          </div>

          {/* Sign In Card */}
          <div className="w-full p-8">
            <div className="text-center mb-6">
              <h2 className="text-xl font-semibold text-gray-800 mb-2">
                Sign in to Finance
              </h2>
              <p className="text-gray-500 text-sm">
                Welcome back! Please sign in to continue
              </p>
            </div>

            {/* Google Sign In Button */}
            <button
              type="button"
              onClick={handleGoogleSignIn}
              disabled={isLoading}
              className="w-full flex items-center justify-center gap-3 border border-gray-300 rounded-lg px-4 py-3 mb-4 hover:bg-gray-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <svg className="w-5 h-5" viewBox="0 0 24 24">
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
                <>
                  <Loader className="animate-spin h-4 w-4" />
                  Signing in...
                </>
              ) : (
                "Continue with Google"
              )}
            </button>

            {/* Divider */}
            <div className="relative mb-6">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-200"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-4 bg-white text-gray-500">or</span>
              </div>
            </div>

            {/* Email/Password Form */}
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Email address
                </label>
                <input
                  id="email"
                  type="text"
                  name="email"
                  required
                  disabled={isLoading}
                  autoComplete="email"
                  className="w-full border border-gray-300 rounded-lg px-3 py-2.5 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 disabled:opacity-50 disabled:bg-gray-50 disabled:cursor-not-allowed"
                />
              </div>

              <div>
                <label
                  htmlFor="password"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Password
                </label>
                <input
                  id="password"
                  type="password"
                  name="password"
                  required
                  disabled={isLoading}
                  autoComplete="current-password"
                  className="w-full border border-gray-300 rounded-lg px-3 py-2.5 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 disabled:opacity-50 disabled:bg-gray-50 disabled:cursor-not-allowed"
                />
              </div>

              {error && (
                <div className="text-red-500 text-sm text-center bg-red-50 border border-red-200 rounded-lg p-2">
                  {error}
                </div>
              )}

              <button
                type="submit"
                disabled={isLoading}
                className="w-full bg-gray-800 hover:bg-gray-900 disabled:bg-gray-400 text-white px-4 py-3 rounded-lg font-medium transition-colors flex items-center justify-center disabled:cursor-not-allowed"
              >
                {isLoading ? (
                  <>
                    <Loader className="animate-spin mr-2 h-4 w-4" />
                    Signing In...
                  </>
                ) : (
                  <>
                    Continue
                    <svg
                      className="ml-2 w-4 h-4"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 5l7 7-7 7"
                      />
                    </svg>
                  </>
                )}
              </button>
            </form>

            {/* Sign Up Link */}
            <div className="text-center mt-6">
              <p className="text-gray-600">
                Don&apos;t have an account?{" "}
                <Link
                  href="/sign-up"
                  className="text-blue-600 hover:text-blue-700 font-medium hover:underline"
                >
                  Sign up
                </Link>
              </p>
            </div>
          </div>
        </div>

        {/* Right Side - Blue with Logo */}
        <div className="min-h-screen hidden lg:flex items-center justify-center bg-blue-600">
          <div className="w-32 h-32 bg-white rounded-full flex items-center justify-center">
            <Image
              src="/logo.svg"
              alt="Logo"
              width={80}
              height={80}
              className="object-contain"
            />
          </div>
        </div>
      </div>
    </AuthRoute>
  );
}
