import { CSSProperties, lazy, Suspense, SVGAttributes, useMemo } from "react";
import { IconContext } from "react-icons";

interface IProps {
    icon: string;
    color?: string;
    size?: string;
    className?: string;
    style?: CSSProperties;
    attr?: SVGAttributes<SVGElement>;
    fallback?: JSX.Element | null;
}
// Helper to load the icon
const loadIcon = async (icon: string) => {
    const [library, iconName] = icon.split("/");
    const lib = library.toLowerCase();
    // Statically construct the import statement using a function map
    const moduleImporters: Record<string, () => Promise<any>> = {
        fa: () => import("react-icons/fa"),
        md: () => import("react-icons/md"),
        ai: () => import("react-icons/ai"),
        // Add other libraries here as needed
    };
    const importer = moduleImporters[lib];
    if (!importer) throw new Error(`Icon library "${library}" is not supported.`);
    const module = await importer()
    const IconComponent = module[iconName]
    if (!IconComponent) throw new Error(`Icon "${icon}" not found in "${library}".`)
    return IconComponent
};

const DynamicIcon: React.FC<IProps> = ({ icon, color, size, className, style, attr, fallback = null }) => {
    // Memoize the icon component so it's loaded only when `icon` changes
    const Icon = useMemo(
        () => lazy(() => loadIcon(icon).then((component) => ({ default: component }))),
        [icon]
    );
    const iconContext = {
        color,
        size,
        className,
        style,
        attr,
    };
    return (
        <Suspense fallback={fallback}>
            <IconContext.Provider value={iconContext}>
                <Icon />
            </IconContext.Provider>
        </Suspense>
    );
};
export default DynamicIcon;