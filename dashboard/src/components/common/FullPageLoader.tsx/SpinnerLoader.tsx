import React from 'react';

interface SpinnerLoaderProps {
    size?: number;
    color?: string;
    position?: 'absolute' | 'fixed';
    top?: string;
    right?: string;
    bottom?: string;
    left?: string;
}

export const SpinnerLoader: React.FC<SpinnerLoaderProps> = ({
    size = 4,
    color = 'text-gray-200',
    position = 'fixed',
    top = '50%',
    right = '50%',
    bottom = 'auto',
    left = 'auto',
}) => {
    const spinnerStyle = {
        borderWidth: size / 8,
        width: size,
        height: size,
        borderColor: 'currentColor',
        borderTopColor: 'transparent',
    };

    const containerStyle = {
        top,
        right,
        bottom,
        left,
    };

    return (
        <div
            className={`inline-block ${color} mr-2 animate-spin rounded-full border-2 border-solid align-[-0.125em] text-surface motion-reduce:animate-[spin_1.5s_linear_infinite] dark:text-white`}
            style={{ ...spinnerStyle, ...containerStyle, position }}
            role="status"
        ></div>
    );
};