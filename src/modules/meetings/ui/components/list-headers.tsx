'use client'
import { Button } from "@/components/ui/button"
import { PlusIcon, XCircleIcon } from "lucide-react"
import { NewMeetingDialog } from "./meeting-dialog"
import { useState } from "react"
import { SearchFilter } from "./search-filter"
import { StatusFilter } from "./status-filters"
import { AgentFilter } from "./agent-filter"
import { useMeetingsFilters } from "../../hooks/use-meetings-filters"
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area"
export const MeetingsListHeader = () => {
    const [filters, setFilters] = useMeetingsFilters()
    const [isDialogOpen, setIsDialogOpen] = useState(false)
    const isAnyFilterModified = 
    !!filters.search || filters.status || filters.agentId

    const onClearFilters = () => {
        setFilters({
            search:"",
            page: 1,
            status:null,
            agentId:"",
        })
    }
    return (
        <>
        <NewMeetingDialog open={isDialogOpen} onOpenChange={setIsDialogOpen}/>
        <div className="py-4 px-4 md:px-8 flex flex-col gap-y-4">
            <div className="flex items-center justify-between">
                <h5 className="font-medium text-xl">My Meetings</h5>
                <Button onClick={() => setIsDialogOpen(true)}>
                    <PlusIcon/>
                    New Meeting
                </Button>
        </div>
        <ScrollArea>
        <div className="flex items-center gap-x-2 p-1">
            <SearchFilter/>
            <StatusFilter/>
            <AgentFilter/>
            {isAnyFilterModified && <Button onClick={onClearFilters}
            variant={"outline"}
            >
                <XCircleIcon className="size-4"/>
                Clear</Button>}
        </div>
        <ScrollBar orientation="horizontal"/>
        </ScrollArea>
        </div>
        </>
    )
}
