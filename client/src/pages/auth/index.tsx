import React from "react";
import {
  SignedIn,
  SignedOut,
  SignInButton,
  SignUpButton,
} from "@clerk/clerk-react";
import { Navigate } from "react-router-dom";

function Auth() {
  return (
    <div className="min-h-screen flex flex-col lg:flex-row">
      
      <div className="lg:w-1/2 h-1/2 lg:h-screen bg-[url(/images/bg-image.jpg)] bg-cover relative">
        <div className="absolute inset-0 bg-slate-900 bg-opacity-50"></div>
      </div>

      
      <div className="lg:w-1/2 h-screen flex flex-col gap-5 justify-center items-center bg-slate-300 p-8">
        <h1 className="text-4xl lg:text-5xl font-bold text-slate-900 mb-5 text-center">
          Finance Tracker
        </h1>
        
        <SignedOut>
          <div className="w-full lg:w-2/3 p-4 text-lg lg:text-xl font-semibold bg-slate-900 hover:bg-slate-700 text-white rounded-md text-center">
            <SignUpButton mode="modal" />
          </div>
          <div className="w-full lg:w-2/3 p-4 text-lg lg:text-xl font-semibold bg-slate-900 hover:bg-slate-700 text-white rounded-md text-center">
            <SignInButton mode="modal" />
          </div>
        </SignedOut>
        
        <SignedIn>
          <Navigate to="/dashboard" />
        </SignedIn>
      </div>
    </div>
  );
}

export default Auth;

