import React from 'react'
import { useUser } from '@clerk/clerk-react'
import { SignedIn, UserButton } from "@clerk/clerk-react";

function Navbar() {
    const { user } = useUser();
  return (
    <>
        <div className='w-full h-14 p-5 mb-5 flex flex-row justify-between align-middle items-baseline shadow-md'>
            <h1 className='self-center text-xl font-semibold'>Welcome {user?.firstName}!</h1>
            <div className='self-center'>
            <SignedIn>
                <UserButton />
            </SignedIn>
            </div> 
         
        </div>
    </>
  )
}

export default Navbar