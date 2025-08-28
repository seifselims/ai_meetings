import { ErrorState } from "@/components/error-state"
import { LoadingState } from "@/components/loading-state"
import { MeetingsView } from "@/modules/meetings/ui/views/meetings-views"
import { getQueryClient, trpc } from "@/trpc/server"
import { dehydrate, HydrationBoundary } from "@tanstack/react-query"
import { Suspense } from "react"
import { ErrorBoundary } from "react-error-boundary"

const Page =() => {
    const queryClient = getQueryClient()
    void queryClient.prefetchQuery(trpc.meetings.getMany.queryOptions({}))
    return (
        <HydrationBoundary state={dehydrate(queryClient)}>
            <Suspense fallback={<LoadingState title='Loading Meetings' description='This may take a few seconds'/>}>
            <ErrorBoundary fallback={<ErrorState title='Error Loading Meetings' description='Something went wrong'/>}>
        <MeetingsView/>
        </ErrorBoundary>
        </Suspense>
        </HydrationBoundary>
    )
}
export default Page