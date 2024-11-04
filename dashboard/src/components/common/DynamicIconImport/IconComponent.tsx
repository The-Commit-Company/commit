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
    // Full list of importable libraries from react-icons
    const moduleImporters: Record<string, () => Promise<any>> = {
        ai: () => import("react-icons/ai"), // Ant Design Icons
        bs: () => import("react-icons/bs"), // Bootstrap Icons
        bi: () => import("react-icons/bi"), // BoxIcons
        ci: () => import("react-icons/ci"), // Circum Icons
        cg: () => import("react-icons/cg"), // css.gg
        di: () => import("react-icons/di"), // Devicons
        fi: () => import("react-icons/fi"), // Feather Icons
        fc: () => import("react-icons/fc"), // Flat Color Icons
        fa: () => import("react-icons/fa"), // Font Awesome 5 Icons
        fa6: () => import("react-icons/fa6"), // Font Awesome 6 Icons
        gi: () => import("react-icons/gi"), // Game Icons
        go: () => import("react-icons/go"), // GitHub Octicons
        gr: () => import("react-icons/gr"), // Grommet Icons
        hi: () => import("react-icons/hi"), // Heroicons
        hi2: () => import("react-icons/hi2"), // Heroicons v2
        im: () => import("react-icons/im"), // IcoMoon Free
        lia: () => import("react-icons/lia"), // Icons8 Line Awesome
        io: () => import("react-icons/io"), // Ionicons
        io5: () => import("react-icons/io5"), // Ionicons v5
        lu: () => import("react-icons/lu"), // Lucide Icons
        md: () => import("react-icons/md"), // Material Design Icons
        pi: () => import("react-icons/pi"), // Phosphor Icons
        rx: () => import("react-icons/rx"), // Radix Icons
        ri: () => import("react-icons/ri"), // Remix Icons
        si: () => import("react-icons/si"), // Simple Icons
        sl: () => import("react-icons/sl"), // Simple Line Icons
        tb: () => import("react-icons/tb"), // Tabler Icons
        tfi: () => import("react-icons/tfi"), // Themify Icons
        ti: () => import("react-icons/ti"), // Typicons
        vsc: () => import("react-icons/vsc"), // VS Code Icons
        wi: () => import("react-icons/wi"), // Weather Icons
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
