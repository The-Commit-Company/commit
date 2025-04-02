import { cn } from "@/lib/utils";
import { TocItem, TocObj } from "@/pages/features/docs/PageContent";
import { Menu } from "lucide-react";

export const OnThisPage = ({ toc_obj }: { toc_obj: TocObj }) => {

    if (Object.keys(toc_obj).length > 0) {

        const hash = window.location.hash;
        return (
            <div className="sticky top-[8rem] max-h-[calc(100vh-16rem)] overflow-y-auto text-gray-600 text-sm leading-6 w-[16.5rem] space-y-2">
                <div className="text-gray-700 dark:text-gray-300 font-medium flex items-center space-x-2 mb-4">
                    <Menu className="h-4 w-4 text-blue-500" />
                    <span>On This Page</span>
                </div>
                <ul className="space-y-2">
                    {Object.keys(toc_obj).map((key, index) => (
                        <TocItemComponent key={key} item={toc_obj[key]} hash={hash} index={index} />
                    ))}
                </ul>
            </div>
        );
    }
    return null;
};

const TocItemComponent = ({ item, hash, index }: { item: TocItem, hash: string, index: number }) => {
    // fetch the hash from url and compare with the item name
    // if it matches, add a class to the anchor tag

    const sanitizeName = (name: string) => {
        return name.replace(/[^\w\s-]/g, '').replace(/\s+/g, '-').toLowerCase();
    };

    const isActive = hash === `#${sanitizeName(item.name)}` || (index === 0 && hash === "");

    return (
        <li>
            <a href={`#${sanitizeName(item.name)}`} className={cn(
                "py-1 block font-medium hover:text-gray-900 dark:text-primary-light",
                isActive ? "text-blue-500 dark:text-primary-light" : ""
            )}
            >
                {item.name.replace(/[^\w\s-]/g, '')}
            </a>
            {Object.keys(item.children).length > 0 && (
                <ul className="ml-4 mt-2 space-y-2">
                    {Object.keys(item.children).map((key) => (
                        <TocItemComponent key={key} item={item.children[key]} hash={hash} index={1} />
                    ))}
                </ul>
            )}
        </li>
    );
};
