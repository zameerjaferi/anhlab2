import React, { ReactNode } from 'react'

interface Props {
    children: ReactNode
}

const AdminLayout = ({children}: Props) => {
  return (
    <div className='flex'>
      <aside className='bg-slate-300 p-5'>Admin Side Bar</aside>
      <div className='ml-5'>{children}</div>
    </div>
  )
}

export default AdminLayout
