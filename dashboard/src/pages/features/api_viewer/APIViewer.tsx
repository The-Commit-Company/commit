import { APIDetails } from "@/components/features/api_viewer/APIDetails"
import { APIList } from "@/components/features/api_viewer/APIList"
import { APIJSON } from "@/components/features/api_viewer/API"

export const APIViewer = () => {

    return (
        <div className="grid grid-cols-5 gap-0">
            <div className="col-span-3 h-screen">
                <APIList apiList={APIJSON} />
            </div>
            <div className="col-span-2 h-screen">
                <APIDetails />
            </div>
        </div>
    )
}