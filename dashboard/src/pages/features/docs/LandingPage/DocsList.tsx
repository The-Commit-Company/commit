import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button";
import { CommitDocs } from "@/types/commit/CommitDocs"
import { useMemo } from "react"
import { MdArrowOutward } from "react-icons/md";
import { useNavigate } from "react-router-dom";

const DocsList = ({ data }: { data: CommitDocs[] }) => {
    return (
        <div className="overflow-hidden rounded-lg sm:grid sm:grid-cols-2 sm:gap-6 ">
            {data.map((item, idx) => (
                <DocCard key={idx} data={item} />
            ))}
        </div>
    )
}

export default DocsList

const DocCard = ({ data }: { data: CommitDocs }) => {

    const appNameInitials = useMemo(() => {
        return data.header[0].toUpperCase()
    }, [data])

    const navigate = useNavigate()

    return (
        <div className="p-4 font-title_font border-l-2">
            <div className="flex justify-between items-center">
                <div className="flex items-center gap-2">
                    <Avatar className="h-10 w-10 flex items-center rounded-lg">
                        <AvatarImage src={data.light_mode_logo} className="object-contain h-full w-full" />
                        <AvatarFallback className="rounded-lg text-xl">
                            {appNameInitials}
                        </AvatarFallback>
                    </Avatar>
                    <div className="font-bold text-xl">
                        {data.header}
                    </div>
                    <Button
                        size={"icon"}
                        aria-label="redirect"
                        variant={"link"}
                        onClick={() => navigate(`../docs/${data.route}`)}
                    >
                        <MdArrowOutward className="h-5 w-5" />
                    </Button>
                </div>
                {data.published == 1 && <div className="flex-none rounded-full bg-emerald-500/20 p-1.5">
                    <div className="size-1.5 rounded-full bg-emerald-500" />
                </div>}
            </div>
            <div className="pt-3 text-sm">
                {data.description}
            </div>

        </div>
    )
}