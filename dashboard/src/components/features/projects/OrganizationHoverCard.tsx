import { CalendarIcon } from "@radix-ui/react-icons"

import {
    Avatar,
    AvatarFallback,
    AvatarImage,
} from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import {
    HoverCard,
    HoverCardContent,
    HoverCardTrigger,
} from "@/components/ui/hover-card"


export interface OrganizationHoverCardProps {
    organization_id: string
    organization_image: string
    joined_on: string
    onHoverText: string
    organization_about: string
}

export const OrganozationHoverCard = ({ organization_id, organization_image, joined_on, onHoverText, organization_about }: OrganizationHoverCardProps) => {

    return (
        <HoverCard>
            <HoverCardTrigger asChild className="px-0">
                <Button variant="link" className="text-gray-700">{onHoverText}</Button>
            </HoverCardTrigger>
            <HoverCardContent className="w-80">
                <div className="flex justify-between space-x-4">
                    <Avatar>
                        <AvatarImage src={organization_image} />
                        <AvatarFallback>VC</AvatarFallback>
                    </Avatar>
                    <div className="space-y-1">
                        <h4 className="text-sm font-semibold">{organization_id}</h4>
                        <p className="text-sm">
                            {organization_about}
                        </p>
                        <div className="flex items-center pt-2">
                            <CalendarIcon className="mr-2 h-4 w-4 opacity-70" />{" "}
                            <span className="text-xs text-muted-foreground">
                                Joined {joined_on}
                            </span>
                        </div>
                    </div>
                </div>
            </HoverCardContent>
        </HoverCard >
    )
}
