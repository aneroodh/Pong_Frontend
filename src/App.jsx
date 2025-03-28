import { useState } from 'react'
import './styles.css'
import { SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/clerk-react";
import GameCanvas from './components/GameCanvas';
export default function App() {
  return (
    <header>
      <SignedOut>
      <div className="min-h-screen flex items-center justify-center login-background">
        <div className="bg-white p-8 rounded-lg shadow-lg text-center">
          <h1 className="text-3xl font-bold text-brown-800 mb-2">Welcome to Pong</h1>
          <p className="text-gray-600 mb-6">Sign in to play Mutiplayer Pong game.</p>
          <SignInButton mode="modal">
            <button className="bg-orange-500 text-white px-6 py-2 rounded-md text-lg font-medium hover:bg-orange-600 transition">
              Sign In
            </button>
          </SignInButton>
        </div>
      </div>
      </SignedOut>
      <SignedIn>
        <div className="flex justify-between w-full max-w-4xl p-4">
          <h1 className="text-2xl font-bold">Pong Game</h1>
          <UserButton />
        </div>
        <GameCanvas />
      </SignedIn>
    </header>
  );
};