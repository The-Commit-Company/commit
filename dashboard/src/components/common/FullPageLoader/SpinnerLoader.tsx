import React from 'react';

interface AsyncSpinnerLoaderProps {
    size?: number;
    color?: string;
    position?: 'absolute' | 'fixed';
    top?: string;
    right?: string;
    bottom?: string;
    left?: string;
}

export const AsyncSpinnerLoader: React.FC<AsyncSpinnerLoaderProps> = ({
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

export interface SpinnerLoaderProps {
    className?: string;
}

export const SpinnerLoader = ({ className }: SpinnerLoaderProps) => {

    return (
        <div
            className={`inline-block h-4 w-4 mr-2 animate-spin rounded-full border-2 border-solid border-current text-gray-200 border-e-transparent align-[-0.125em] text-surface motion-reduce:animate-[spin_1.5s_linear_infinite] dark:text-white ${className}`}
            role="status">
        </div>
    )
}