'use client'
import { useTRPC } from '@/trpc/client'
import { useQuery } from '@tanstack/react-query'
import React, { useState } from 'react'

export const HomeView = () => {
  const trpc=useTRPC()
  const {data} = useQuery(trpc.hello.queryOptions({text:'from tRPC client'}))

    return (
      <div className='flex flex-col items-center justify-center h-screen gap-4'>
      {data?.greeting}
      </div>
    )


}
