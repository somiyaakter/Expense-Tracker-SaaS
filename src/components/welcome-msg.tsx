

import { useSession } from '@/lib/auth-client';
import React from 'react'


export default function WelcomeMsg() {

  const {data,isPending} = useSession();
  return (
      <div className='space-y-2 mb-4 '>
         
      <h2 className='text-2xl lg:text-4xl text-white font-medium'>Welcome Back {isPending ? "" : ", "}{data?.user?.name} ✋</h2>
          <p className='text-sm lg:text-base text-accent'>This is your Financial Overview Report</p>
    </div>
  )
}
