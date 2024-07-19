import Image from "next/image";
import Link from "next/link";
import { getServerSession } from "next-auth";
import { authOptions } from "./lib/auth";

export default async function Home() {
  const session = await getServerSession(authOptions)

  return (
    <main className="min-h-screen flex flex-col items-center justify-center">
      <h1 className="p-5">Welcome to Anklesaria Laboratory</h1>
      <h2 className="p-5" >Hello {session && session.user?.name}</h2>
      <Link className="btn btn-primary " href="/dashboard">Click here to view Dashboard</Link>
    </main>
    );
}
