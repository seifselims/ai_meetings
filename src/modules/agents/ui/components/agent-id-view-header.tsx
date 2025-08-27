import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbSeparator
} from "@/components/ui/breadcrumb"
import { ChevronRightIcon, TrashIcon, PencilIcon, MoreVerticalIcon  } from "lucide-react"
import {
    DropdownMenu,
    DropdownMenuTrigger,
    DropdownMenuItem,
    DropdownMenuContent
} from "@/components/ui/dropdown-menu"
import { Button } from "@/components/ui/button"
import Link from "next/link"
interface Props {
    agentId: string,
    agentName: string,
    onEdit: () => void
    onRemove: () => void
}

export const AgentIdViewHeader = ({agentId, agentName, onEdit, onRemove}: Props) => {
    return (
        <div className="flex items-center justify-between">
            <Breadcrumb>
            <BreadcrumbList>
            <BreadcrumbItem>
            <BreadcrumbLink asChild className="font-medium text-xl">
            <Link href="/agents">
            My Agents
            </Link>
            </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator className="text-foreground text-xl font-medium [&>svg]:size-4">
            <ChevronRightIcon/>
            </BreadcrumbSeparator>
            <BreadcrumbItem>
            <BreadcrumbLink asChild className="font-medium text-xl text-foreground">
            <Link href={`/agents/${agentId}`}>
            {agentName}
            </Link>
            </BreadcrumbLink>
            </BreadcrumbItem>
            </BreadcrumbList>
            </Breadcrumb>
            {/* Without modal={false}, the dialog that this dropdown opens causes the website to br unclickable */}
            <DropdownMenu modal={false}>
                <DropdownMenuTrigger asChild>
                    <Button variant="ghost">
                        <MoreVerticalIcon className="h-4 w-4" />
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                    <DropdownMenuItem onClick={onEdit}>
                        <PencilIcon className="text-black h-4 w-4" />
                        Edit
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={onRemove}>
                        <TrashIcon className="text-black h-4 w-4" />
                        Delete
                    </DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>
        </div>
    )
}