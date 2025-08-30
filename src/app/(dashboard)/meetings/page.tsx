import { ErrorState } from "@/components/error-state"
import { LoadingState } from "@/components/loading-state"
import { auth } from "@/lib/auth"
import { loadSearchParams } from "@/modules/meetings/params"
import {MeetingsListHeader} from "@/modules/meetings/ui/components/list-headers"
import { MeetingsView } from "@/modules/meetings/ui/views/meetings-views"
import { getQueryClient, trpc } from "@/trpc/server"
import { dehydrate, HydrationBoundary } from "@tanstack/react-query"
import { headers } from "next/headers"
import { redirect } from "next/navigation"
import { SearchParams } from "nuqs/server"
import { Suspense } from "react"
import { ErrorBoundary } from "react-error-boundary"

interface Props {
  searchParams:Promise<SearchParams>
}
const Page = async ({searchParams}:Props) => {
  const filters = await loadSearchParams(searchParams)
    const session = await auth.api.getSession({
      headers: await headers(),
    })
    if (!session) {
      redirect('/sign-in') 
    }
    const queryClient = getQueryClient()
    void queryClient.prefetchQuery(trpc.meetings.getMany.queryOptions({
      ...filters
    }))
    return (
        <>
        <MeetingsListHeader/>
        <HydrationBoundary state={dehydrate(queryClient)}>
            <Suspense fallback={<LoadingState title='Loading Meetings' description='This may take a few seconds'/>}>
            <ErrorBoundary fallback={<ErrorState title='Error Loading Meetings' description='Something went wrong'/>}>
        <MeetingsView/>
        </ErrorBoundary>
        </Suspense>
        </HydrationBoundary>
        </>
    )
}
export default Page