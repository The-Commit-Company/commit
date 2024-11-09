import { CommitDocs } from "@/types/commit/CommitDocs";
import { DocsFooterItem } from "./docs";
import { FaLinkedin, FaSlack, FaGithub, FaYoutube, FaTelegram } from "react-icons/fa";
import { GiRaven } from "react-icons/gi";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { FaXTwitter } from "react-icons/fa6";


export const Footer = ({ commit_docs, footer_items }: { commit_docs: Omit<CommitDocs, 'sidebar' | 'navbar_items' | 'footer'>, footer_items: Record<string, DocsFooterItem[]> }) => {

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
        <footer className="bg-white flex flex-col gap-8 p-16 border-t">
            <div className="container mx-auto px-4">
                <div className="flex justify-between items-start">
                    {/* Logo */}
                    <div className="flex items-center justify-center flex-row gap-2">
                        {commit_docs.light_mode_logo && (
                            <img src={commit_docs.light_mode_logo} alt="Logo" className="h-8 w-auto" />
                        )}
                        {commit_docs.header && (
                            <h4 className="text-lg font-semibold">{commit_docs.header}</h4>
                        )}
                    </div>

                    {/* Footer sections */}
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

                    {/* Social media icons */}
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
        </footer>
    )
}


interface SocialMediaIconProps {
    field: string;
    url: string;
}
const classsName = "text-gray-600 hover:text-gray-800 h-5 w-5";

const iconMap: Record<string, JSX.Element> = {
    twitter: <FaXTwitter className={classsName} />,
    linkedin: <FaLinkedin className={classsName} />,
    slack: <FaSlack className={classsName} />,
    github: <FaGithub className={classsName} />,
    youtube: <FaYoutube className={classsName} />,
    telegram: <FaTelegram className={classsName} />,
    raven: <GiRaven className={classsName} />,
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