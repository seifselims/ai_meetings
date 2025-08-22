import React from 'react'
import { HomeView } from '@/modules/home/ui/home-view'
import { auth } from '@/lib/auth'
import { headers } from 'next/headers'
import { redirect } from 'next/navigation'

const Page = async () =>  {
  const session = await auth.api.getSession({
    headers: await headers(),
  })
  if (!session) {
    redirect('/sign-in') 
  }
  return <HomeView />
}

export default Page
