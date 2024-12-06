import { Button } from "@/components/ui/button";
import React from "react";
import { MdLink } from "react-icons/md";

const CustomHeading = ({ id, children, as }: { id: string, children: React.ReactNode, as: string }) => {
    return (
        <div className="group flex items-center gap-2">
            {React.createElement(as, { id }, children)}
            <a
                href={`#${id}`}
                className="opacity-0 group-hover:opacity-100 transition-opacity duration-200"
            >
                <Button
                    variant="outline"
                    size="icon"
                    className="mt-2 h-6 w-6"
                >
                    <MdLink className="h-4 w-4 text-gray-500" />
                </Button>
            </a>
        </div>
    );
};

export default CustomHeading;