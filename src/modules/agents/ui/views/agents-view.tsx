'use client'

import { ErrorState } from "@/components/error-state"
import { LoadingState } from "@/components/loading-state"
import { ResponsiveDialog } from "@/components/responsive-dialog"
import { Button } from "@/components/ui/button"
import { useTRPC } from "@/trpc/client"
import { useSuspenseQuery } from "@tanstack/react-query"
import React, { useState } from 'react'

export const AgentsView = () => {
  const trpc=useTRPC()
  const {data} = useSuspenseQuery(trpc.agents.getMany.queryOptions())

    return (
      <div className='flex flex-col items-center justify-center h-screen gap-4'>
     {JSON.stringify(data, null, 2)}
      </div>
    )
}