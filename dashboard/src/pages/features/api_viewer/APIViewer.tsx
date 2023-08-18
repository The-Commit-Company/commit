import { APIDetails } from "@/components/features/api_viewer/APIDetails"
import { APIList } from "@/components/features/api_viewer/APIList"
import { APIJSON } from "@/components/features/api_viewer/API"
import { useState } from "react"

export const APIViewer = () => {

    const [selectedendpoint, setSelectedEndpoint] = useState<string>(APIJSON[0].name)

    return (
        <div className="grid grid-cols-5 gap-0">
            <div className="col-span-3 h-screen">
                <APIList apiList={APIJSON} setSelectedEndpoint={setSelectedEndpoint} />
            </div>
            <div className="col-span-2 h-screen">
                <APIDetails endpointData={APIJSON} selectedEndpoint={selectedendpoint} />
            </div>
        </div>
    )
}