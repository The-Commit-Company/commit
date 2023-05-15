import { cn } from "@/lib/utils"

export const CircularSpinner = ({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) => {
    return (
        <div className={cn("flex justify-center items-center", className)} {...props}>
            <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-primary-foreground" />
        </div>
    )
}