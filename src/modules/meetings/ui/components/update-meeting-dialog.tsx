import { ResponsiveDialog } from "@/components/responsive-dialog";
import { MeetingForm } from "./meeting-form";
import { MeetingGetOne } from "../../types";
interface UpdateMeetingDialogProps {
    open:boolean,
    onOpenChange: (open: boolean) => void
    intialValues: MeetingGetOne
}
export const UpdateMeetingDialog = ({open, onOpenChange, intialValues}: UpdateMeetingDialogProps) => {
    return (
        <ResponsiveDialog title="Edit Meeting" description="Edit current meeting" open={open} onOpenChange={onOpenChange}>
            <MeetingForm
            onSuccess={() => {onOpenChange(false)}}
            onCancel={() => {onOpenChange(false)}}
            initialValues={intialValues}
            />
        </ResponsiveDialog>
    )
}