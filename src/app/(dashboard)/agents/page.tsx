import { ErrorState } from '@/components/error-state'
import { LoadingState } from '@/components/loading-state'
import { AgentsView } from '@/modules/agents/ui/views/agents-view'
import { getQueryClient, trpc } from '@/trpc/server'
import { dehydrate, HydrationBoundary } from '@tanstack/react-query'
import React, { Suspense } from 'react'
import {ErrorBoundary} from 'react-error-boundary'

const Page = async () => {
  const queryClient = getQueryClient()
  void queryClient.prefetchQuery(trpc.agents.getMany.queryOptions())
  return (
  <HydrationBoundary state={dehydrate(queryClient)}>
    <Suspense fallback={<LoadingState title='Loading Agents' description='This may take a few seconds'/>}>
    <ErrorBoundary fallback={<ErrorState title='Error Loading Agents' description='Something went wrong'/>}>
        <AgentsView/>
    </ErrorBoundary>
  </Suspense>
  </HydrationBoundary>

  )
}

export default Page
