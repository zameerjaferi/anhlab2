"use client"
import React from 'react'
import Link from 'next/link'
import { useSession } from 'next-auth/react'

const Navbar = () => {
  const {status, data: session} = useSession()

  return (
    <div className='flex bg-slate-300 p-5' >
      <Link href="/" className='mr-5'>Home</Link>
      <Link href="/dashboard" className='mr-5'>Dashboard</Link>
      {status === "loading" && <div>loading...</div>}
      {status === "authenticated" && 
      <div>
        {session.user!.name}
        <Link className='ml-5' href="/api/auth/signout" >Sign out</Link>
        </div> }
      {status === "unauthenticated" && <Link href="api/auth/signin">Sign in</Link>}
    </div>
  )
}

export default Navbar
