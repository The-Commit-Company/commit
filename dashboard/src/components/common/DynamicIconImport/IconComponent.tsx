import React, { CSSProperties, lazy, Suspense, SVGAttributes, useMemo } from 'react';

interface LucideDynamicIconProps {
    icon: string;
    color?: string;
    size?: number | string;
    className?: string;
    style?: CSSProperties;
    strokeWidth?: number;
    absoluteStrokeWidth?: boolean;
    attr?: SVGAttributes<SVGElement>;
    fallback?: JSX.Element | null;
}

// Helper to load the icon
const loadLucideIcon = async (iconName: string) => {
    try {
        const module: any = await import('lucide-react');
        const IconComponent = module[iconName];

        if (!IconComponent) {
            throw new Error(`Icon "${iconName}" not found in Lucide React library`);
        }

        return IconComponent;
    } catch (error) {
        console.error('Failed to load Lucide icon:', error);
        throw error;
    }
};

const DynamicIcon: React.FC<LucideDynamicIconProps> = ({
    icon,
    color,
    size = 24,
    className,
    style,
    strokeWidth,
    absoluteStrokeWidth,
    attr,
    fallback = null
}) => {
    // Memoize the icon component so it's loaded only when `icon` changes
    const Icon = useMemo(
        () => lazy(() => loadLucideIcon(icon).then((component) => ({ default: component }))),
        [icon]
    );

    return (
        <Suspense fallback={fallback}>
            <Icon
                color={color}
                // @ts-ignore
                size={size}
                className={className}
                style={style}
                strokeWidth={strokeWidth}
                absoluteStrokeWidth={absoluteStrokeWidth}
                {...attr}
            />
        </Suspense>
    );
};

export default DynamicIcon;
