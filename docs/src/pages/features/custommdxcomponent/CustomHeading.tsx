import { Button } from "@/components/ui/button";
import { Link2 } from "lucide-react";
import React, { useEffect, useRef } from "react";

const CustomHeading = ({ id, children, as }: { id: string, children: React.ReactNode, as: string }) => {
    const headingRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleHashChange = () => {
            if (window.location.hash === `#${id}` && headingRef.current) {
                const offset = 74; // Adjust this value as needed
                const bodyRect = document.body.getBoundingClientRect().top;
                const elementRect = headingRef.current.getBoundingClientRect().top;
                const elementPosition = elementRect - bodyRect;
                const offsetPosition = elementPosition - offset;

                window.scrollTo({
                    top: offsetPosition,
                });
            }
        };

        window.addEventListener("hashchange", handleHashChange, false);

        // Check if the current hash matches the id on initial load
        if (window.location.hash === `#${id}` && headingRef.current) {
            const offset = 74; // Adjust this value as needed
            const bodyRect = document.body.getBoundingClientRect().top;
            const elementRect = headingRef.current.getBoundingClientRect().top;
            const elementPosition = elementRect - bodyRect;
            const offsetPosition = elementPosition - offset;

            window.scrollTo({
                top: offsetPosition,
            });
        }

        return () => {
            window.removeEventListener("hashchange", handleHashChange, false);
        };
    }, [id]);

    return (
        <div ref={headingRef} className="group flex items-center gap-2">
            {React.createElement(as, { id }, children)}
            <a
                href={`#${id}`}
                className="opacity-0 group-hover:opacity-100 transition-opacity duration-200"
            >
                <Button
                    variant="outline"
                    size="icon"
                    className="h-5 w-5"
                >
                    <Link2 size={12} className="text-gray-500" />
                </Button>
            </a>
        </div>
    );
};

export default CustomHeading;