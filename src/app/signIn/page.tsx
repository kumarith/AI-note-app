"use client";

import React, { useState } from "react";
import { signIn } from "next-auth/react";

const SignIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleEmailSignIn = async () => {
    const res = await signIn("credentials", {
      redirect: true,        
      callbackUrl: "/dashboard",
      email,
      password,
    });
    if (!res?.ok) {
      console.error("Failed to sign in with email:", res?.error);
      return;
    }
    console.log(res);
  };

  return (
    <div className="flex flex-col justify-center items-center m-10 p-8 sm:p-20">
      <button
        className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition-colors mb-4"
        onClick={() =>
          signIn("google", { callbackUrl: "/dashboard" })
        }
      >
        Sign In with Google
      </button>

      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="mb-2 p-2 border rounded-md w-64"
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        className="mb-2 p-2 border rounded-md w-64"
      />
      <button
        className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600 transition-colors"
        onClick={handleEmailSignIn}
      >
        Sign In with Email
      </button>
    </div>
  );
};

export default SignIn;
