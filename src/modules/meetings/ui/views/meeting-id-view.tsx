'use client'
import { useTRPC } from "@/trpc/client"
import { useMutation, useQueryClient, useSuspenseQuery } from "@tanstack/react-query"
import { MeetingIdViewHeader } from "../components/meeting-id-view-header"
import { useRouter } from "next/navigation"
import { toast } from "sonner"
import { useConfirm } from "@/hooks/use-confirm"
import { UpdateMeetingDialog } from "../components/update-meeting-dialog"
import { useState } from "react"
import { UpcomingState } from "../components/upcoming-state"
import { ActiveState } from "../components/active-state"
import { CancelledState } from "../components/cancelled-state"
import { ProcessingState } from "../components/processing-state"

interface Props {
    meetingId: string
}
export const MeetingIdView = ({meetingId}:Props) => {
    const trpc = useTRPC()
    const queryClient = useQueryClient()
    const router = useRouter()
    const [UpdateMeetingDialogOpen, setUpdateMeetingDialogOpen] = useState(false)
    const {data} = useSuspenseQuery(trpc.meetings.getOne.queryOptions({id:meetingId}))
    const removeMeeting  = useMutation(trpc.meetings.remove.mutationOptions({
        onSuccess: () => {
            queryClient.invalidateQueries(trpc.meetings.getMany.queryOptions({}))
            // TODO: invalidate free tier usage
            router.push("/meetings")
        },
        onError: (error) => {
            toast.error(error.message)
        }
    }))
    const [RemoveConfirmation, confirmRemove] =useConfirm(
        "Are you sure?",
        `The following meeting will be permanently deleted: ${data.name}. This action cannot be undone.`,
    )
    const handleRemove = async () => {
        const ok = await confirmRemove()

        if(!ok) return

        await removeMeeting.mutateAsync({id: meetingId})
    }
    const isActive = data.status === "active"
    const isUpcoming = data.status === "upcoming"
    const isCancelled = data.status === "cancelled"
    const isCompleted = data.status === "completed"
    const isProcessing = data.status === "processing"

    return (
        <>
        <RemoveConfirmation/>
        <UpdateMeetingDialog
        open={UpdateMeetingDialogOpen}
        onOpenChange={setUpdateMeetingDialogOpen}
        intialValues={data}
        />
        <div className="flex-1 py-4 px-4 md:px-8 flex flex-col gap-y-4">
            <MeetingIdViewHeader 
            meetingId={meetingId} 
            meetingName={data.name} 
            onEdit={() => setUpdateMeetingDialogOpen(true)} 
            onRemove={handleRemove}/>
            {isCancelled &&  <div><CancelledState/></div>}
            {isCompleted &&  <div>Completed</div>}
            {isProcessing &&  <div><ProcessingState/></div>}
            {isUpcoming &&  <div><UpcomingState 
            meetingId={meetingId} 
            onCancelMeeting={() =>{}} 
            isCancelling={false}/></div>}
            {isActive &&  <div><ActiveState meetingId={meetingId}/></div>}
        </div>
        </>
    )
}