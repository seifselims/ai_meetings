'use client'

import { ErrorState } from "@/components/error-state"
import { LoadingState } from "@/components/loading-state"
import { ResponsiveDialog } from "@/components/responsive-dialog"
import { Button } from "@/components/ui/button"
import { useTRPC } from "@/trpc/client"
import { useSuspenseQuery } from "@tanstack/react-query"
import React, { useState } from 'react'
import { DataTable } from "../components/data-table"
import { columns } from "../components/columns"
import { EmptyState } from "@/components/empty-state"


export const AgentsView = () => {
  const trpc=useTRPC()
  const {data} = useSuspenseQuery(trpc.agents.getMany.queryOptions())

    return (
      // <div className='flex flex-col items-center justify-center h-screen gap-4'>
      <div className="flex-1 pb-4 px-4 md:px-8 flex flex-col gap-y-4">
        <DataTable data={data} columns={columns}/>
        {data.length===0 && <EmptyState title="Create Your First Agent " description="Get started by creating your first agent."/>}
      </div>
    )
}