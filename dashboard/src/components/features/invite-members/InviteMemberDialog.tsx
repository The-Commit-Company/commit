import { CopyButton } from "@/components/common/copy-button/CopyButton";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { useToast } from "@/hooks/use-toast";
import { isEmailValid } from "@/utils/validations/validations";
import { useEffect } from "react";
import { useForm } from "react-hook-form";

export const InviteMemberDialog = () => {

    interface MemberEmails {
        "member-email-ids": string
    }

    const form = useForm<MemberEmails>({
        defaultValues: {
            "member-email-ids": ""
        }
    })

    useEffect(() => {
        form.register("member-email-ids", {
            required: "Please add at least one email address"
        })
    }, [form])

    const { toast } = useToast()

    function onSubmit(data: MemberEmails) {
        const emails = data["member-email-ids"]
        const emailArray = emails.split(" ")
        const isValid = emailArray.every((email: string) => isEmailValid(email))
        const isDuplicate = emailArray.some((email: string, index: number) => emailArray.indexOf(email) !== index)

        if (!isValid) {
            toast({
                variant: "destructive",
                title: "Uh oh! Something went wrong",
                description: "Please check your email addresses and try again.",
            })
        } else if (isDuplicate) {
            toast({
                variant: "destructive",
                title: "Uh oh! Something went wrong",
                description: "Duplicate emails detected",
            })
        } else {
            toast({
                title: "Invitations sent!"
            })
            console.log(data)
        }
    }

    const handleRemoveEmail = (removedEmail: string) => {
        const currentEmails = form.getValues("member-email-ids") as string
        const updatedEmails = currentEmails
            .split(" ")
            .filter(email => email !== removedEmail)
            .join(" ");
        form.setValue("member-email-ids", updatedEmails)
    }

    return (
        <Dialog>
            <DialogTrigger>Add Members</DialogTrigger>
            <DialogContent>

                <DialogHeader>
                    <DialogTitle>Add Members</DialogTitle>
                    <DialogDescription>
                        Give your teammates access to this project and start collaborating in real time.
                    </DialogDescription>
                </DialogHeader>

                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)}>
                        <FormField
                            control={form.control}
                            name="member-email-ids"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Email</FormLabel>
                                    <FormControl>
                                        <div className="space-y-2">
                                            <div className="flex space-x-2">
                                                <Input placeholder="contact@example.com" {...field} />
                                                <Button type="submit" className="shrink-0">
                                                    Send Invite
                                                </Button>
                                            </div>
                                            <div className="flex flex-wrap gap-2 text-xs">
                                                {field.value &&
                                                    field.value.split(" ").map((email: string, index: number) => (
                                                        <div
                                                            key={index}
                                                            className={`flex items-center space-x-1 px-2 py-1 ${isEmailValid(email) ? "bg-gray-200" : "bg-red-200"} rounded`}>
                                                            <span>{email}</span>
                                                            <button
                                                                type="button"
                                                                className="text-gray-500 hover:text-gray-700"
                                                                onClick={() => handleRemoveEmail(email)}>
                                                                &#10005;
                                                            </button>
                                                        </div>
                                                    ))}
                                            </div>
                                        </div>
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </form>
                </Form>

                <Separator className="my-2" />

                <div className="flex space-x-2">
                    <Input value="http://example.com/link/to/project" readOnly />
                    <CopyButton value="http://example.com/link/to/project" />
                </div>

                <DialogDescription className="text-xs ml-1">
                    Anyone with this link can join your project.
                </DialogDescription>

            </DialogContent>
        </Dialog>
    )
}