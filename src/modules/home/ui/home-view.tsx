'use client'
import { Button } from '@/components/ui/button'
import React, { useState } from 'react'
import { authClient } from '@/db/auth-client'
import { useRouter } from 'next/router'

export const HomeView = () => {
  const { data: session } = authClient.useSession() 
  const router=useRouter()
  if (!session) {
    return (
      <p>Loading...</p>
    )
  }
    return (
      <div className='flex flex-col items-center justify-center h-screen gap-4'>
        <h1>Welcome, {session.user.name}</h1>
        <Button onClick={() => authClient.signOut({
            fetchOptions: {
                onSuccess: () => {
                    router.push('/sign-in') 
                }
            }
        })}>Sign Out</Button>
      </div>
    )


}
