import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { useGetCommitDocsDetails } from "@/hooks/useGetCommitDocsDetails";
import { Bird, Github, Linkedin, Send, Slack, Twitter, Youtube } from "lucide-react";


export const Footer = ({ ID }: { ID: string }) => {

    const { data, isLoading } = useGetCommitDocsDetails(ID);

    if (data) {
        const commit_docs = data.commit_docs;
        const footer_items = data.footer_items

        const social_links = {
            'raven': commit_docs.raven,
            'twitter': commit_docs.twitter_url,
            'linkedin': commit_docs.linkedin,
            'slack': commit_docs.slack,
            'github': commit_docs.github,
            'youtube': commit_docs.youtube,
            'telegram': commit_docs.telegram,
        }
        return (
            <footer id="footer" className="flex flex-col items-center mx-auto py-4 border-t w-full border-gray-100 dark:border-gray-800/50">
                <div className="flex w-full flex-col gap-12 justify-between p-8 z-0">
                    <div className="container mx-auto px-4">
                        <div className="flex justify-between items-start">
                            <div className="flex items-center justify-center flex-row gap-2">
                                {commit_docs.light_mode_logo && (
                                    <img src={commit_docs.light_mode_logo} alt="Logo" className="h-8 w-auto" />
                                )}
                                {commit_docs.header && (
                                    <h4 className="text-lg font-semibold">{commit_docs.header}</h4>
                                )}
                            </div>

                            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-10">
                                {Object.keys(footer_items).map((section) => (
                                    <div key={section} className="flex flex-col gap-4">
                                        <h5 className="text-sm font-semibold text-gray-950">{section}</h5>
                                        <ul className="space-y-4">
                                            {footer_items[section].map((item) => (
                                                <li key={item.label} className="text-sm max-w-36 whitespace-normal md:truncate text-gray-950/50 hover:text-gray-950/70">
                                                    <a
                                                        href={item.url}
                                                        target="_blank"
                                                        rel="noopener noreferrer"
                                                    >
                                                        {item.label}
                                                    </a>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                ))}
                            </div>

                            <div className="flex space-x-4">
                                {Object.entries(social_links).map(([field, url]) =>
                                    url ? <SocialMediaIcon key={field} field={field} url={url} /> : null
                                )}
                            </div>
                        </div>
                    </div>
                    <div className="container mx-auto px-4 text-center text-sm text-gray-950/50">
                        Copyright © {new Date().getFullYear()} {commit_docs.company_name}, Build with commit.
                    </div>
                </div>
            </footer>
        )
    }
    if (isLoading) {
        return <FooterSkeleton />;
    }
    return null
}


interface SocialMediaIconProps {
    field: string;
    url: string;
}
const classsName = "text-gray-600 hover:text-gray-800 h-5 w-5";

const iconMap: Record<string, JSX.Element> = {
    twitter: <Twitter className={classsName} />,
    linkedin: <Linkedin className={classsName} />,
    slack: <Slack className={classsName} />,
    github: <Github className={classsName} />,
    youtube: <Youtube className={classsName} />,
    telegram: <Send className={classsName} />,
    raven: <Bird className={classsName} />,
    // Add more icons here as needed
};

const SocialMediaIcon: React.FC<SocialMediaIconProps> = ({ field, url }) => {
    const icon = iconMap[field];
    if (!icon) return null; // Return nothing if the field is not in iconMap

    return (
        <TooltipProvider>
            <Tooltip>
                <TooltipTrigger asChild>
                    <a href={url} target="_blank" rel="noopener noreferrer" aria-label={field}>
                        {icon}
                    </a>
                </TooltipTrigger>
                <TooltipContent side="bottom" className="mr-6">
                    {field.charAt(0).toUpperCase() + field.slice(1)}
                </TooltipContent>
            </Tooltip>
        </TooltipProvider>
    );
};

const FooterSkeleton = () => {
    return (
        <footer id="footer" className="flex flex-col items-center mx-auto py-8 border-t w-full border-gray-100 dark:border-gray-800/50">
            <div className="flex w-full flex-col gap-12 justify-between p-8 z-0">
                <div className="container mx-auto px-4">
                    <div className="flex justify-between items-start">
                        <div className="flex items-center justify-center flex-row gap-2">
                            <div className="flex items-center gap-4 mb-8">
                                <div className="h-8 w-8 bg-gray-200 dark:bg-gray-700 rounded"></div>
                                <div className="h-6 w-24 bg-gray-200 dark:bg-gray-700 rounded"></div>
                            </div>

                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-10">
                            {
                                [...Array(3)].map((_, idx) => (
                                    <div key={idx} className="flex flex-col gap-4">
                                        <h5 className="text-sm font-semibold text-gray-950">
                                            <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-24"></div>
                                        </h5>
                                        <ul className="space-y-4">
                                            {
                                                [...Array(3)].map((_, idx) => (
                                                    <li key={idx} className="text-sm max-w-36 whitespace-normal md:truncate text-gray-950/50 hover:text-gray-950/70">
                                                        <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-24"></div>
                                                    </li>
                                                ))
                                            }
                                        </ul>
                                    </div>
                                ))
                            }
                        </div>

                        <div className="flex space-x-4">
                            {
                                [...Array(7)].map((_, idx) => (
                                    <div key={idx} className="h-5 w-5 bg-gray-200 dark:bg-gray-700 rounded-full"></div>
                                ))
                            }
                        </div>
                    </div>
                </div>
            </div>
            <div className="container mx-auto px-4 text-center text-sm text-gray-950/50">
                <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-80 mx-auto"></div>
            </div>
        </footer>
    );
};