import { SmallCircularSpinner } from "@/components/common/loader/SmallCicularSpinner"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { cn } from "@/lib/utils"
import { useFrappeGetDoc } from "frappe-react-sdk"
import { useState } from "react"
import { AiFillGithub } from "react-icons/ai"

interface UserAuthFormProps extends React.HTMLAttributes<HTMLDivElement> {
    className?: string
}

export const UserAuthForm = ({ className, ...props }: UserAuthFormProps) => {
    const [isLoading, setIsLoading] = useState<boolean>(false)

    async function onSubmit(event: React.SyntheticEvent) {
        event.preventDefault()
        setIsLoading(true)

        setTimeout(() => {
            setIsLoading(false)
        }, 3000)
    }

    // const { data } = useFrappeGetDoc('Connected App', 'fa306fb623')
    // console.log(data);

    return (
        <div className={cn("grid gap-6", className)} {...props}>
            <form onSubmit={onSubmit}>
                <div className="grid gap-2">
                    <div className="grid gap-1">
                        <Label className="sr-only" htmlFor="email">
                            Email
                        </Label>
                        <Input
                            id="email"
                            placeholder="name@example.com"
                            type="email"
                            autoCapitalize="none"
                            autoComplete="email"
                            autoCorrect="off"
                            disabled={isLoading}
                        />
                    </div>
                    <Button disabled={isLoading} className="mt-1">
                        {isLoading && (
                            <SmallCircularSpinner className="pr-2" />
                        )}
                        Sign In with Email
                    </Button>
                </div>
            </form>
            <div className="relative">
                <div className="absolute inset-0 flex items-center">
                    <span className="w-full border-t" />
                </div>
                <div className="relative flex justify-center text-xs uppercase">
                    <span className="bg-background px-2 text-muted-foreground">
                        Or continue with
                    </span>
                </div>
            </div>
            <Button variant="outline" type="button" disabled={isLoading}>
                {isLoading ? <SmallCircularSpinner /> : <div className="text-lg pr-1"><AiFillGithub /></div>}{" "}
                Github
            </Button>
        </div>
    )
}