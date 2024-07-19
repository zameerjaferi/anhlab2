import Link from 'next/link'
import { getServerSession } from "next-auth/next"
import { authOptions } from '../lib/auth'
import { redirect } from 'next/navigation'
import prisma from '@/prisma/client'

export default async function Dashboard() {
  const session = await getServerSession(authOptions)

  if (!session) {
    redirect('/login')
  }

  const INo = session.user?.labId!;

  const reports = await prisma.report.findMany({
    where: { labId: INo},
    
  });

  return (
    <div className="flex min-h-screen flex-col items-center justify-center p-24">
      <h1 className="text-4xl font-bold mb-8">Patient Dashboard</h1>
      <p className="mb-4">Welcome, {session.user?.name || session.user?.email}</p>
      <div className="mb-4">
        <h2 className="text-2xl font-bold mb-2">Your Reports:</h2>
        <ul>
          {reports.map((report) => (
            <li key={report.id}>
              <Link href={`/reports/${report.testId}`} className="text-blue-500 hover:underline">
                {report.title}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}