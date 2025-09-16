"use client";

import { useState } from "react";

  
   
   const SignOut = () => {
     return (
      <div className="flex flex-col justify-center items-center m-10 p-8 sm:p-20">
                <h2 className="text-2xl mb-4">You have been signed out.</h2>
                <p className="mb-4">Thank you for using our AI Notes App!</p>
                <a href="/signIn" className="text-blue-500 hover:underline">
                    Sign In Again
                </a>
            </div> 
     )
   }
export default SignOut;
    