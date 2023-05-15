import { cn } from "@/lib/utils"

export const SmallCircularSpinner = ({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) => {
    return (
        <div className={cn("flex justify-center items-center", className)} {...props}>
            <div className="animate-spin rounded-full h-5 w-5 border-t-2 border-b-2 border-primary-foreground" />
        </div>
    )
}