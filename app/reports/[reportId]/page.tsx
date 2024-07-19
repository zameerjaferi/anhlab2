import { getServerSession } from "next-auth/next"
import { authOptions } from "@/app/api/auth/[...nextauth]/route"
import { redirect } from 'next/navigation'
import prisma from "@/prisma/client"
import { notFound } from 'next/navigation'
import Link from 'next/link'

export default async function ReportPage({ params }: { params: { reportId: string } }) {
  const session = await getServerSession(authOptions)
  if (!session || !session.user) {
    redirect('/login')
  }

  const reportId = parseInt(params.reportId)
  const userId = session.user?.labId!
    const report = await prisma.report.findFirst({
      where: {
        testId: reportId,
        labId: userId
 
    }
    
})
    if(!report){
      notFound()
    }

    return (
      <div className="flex min-h-screen flex-col items-center justify-center p-24">
        <h1 className="text-4xl font-bold mb-8">{report?.title}</h1>
        <div className="bg-white p-6 rounded shadow-md">
          <p>{report?.content}</p>
          <p className="mt-4 text-sm text-gray-500">Created at: {report?.createdAt.toLocaleString()}</p>
        </div>
          <Link href={`/api/download/${userId}/${reportId}`} className="mt-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
            Download Report
          </Link>
      </div>
    )
}