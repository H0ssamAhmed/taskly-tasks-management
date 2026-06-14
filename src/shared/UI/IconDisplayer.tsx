// src/components/Shared/UI/Icon.tsx
import * as Icons from '@/assets/svg/index.ts';
import { cn } from '@/lib/utils';

interface IconProps {
    name: keyof typeof Icons;
    width?: number | string;
    height?: number | string;
    className?: string;
    color?: string;
    onClick?: () => void;
}

export const IconDisplayer = ({ name, width = 24, height = 24, className = '', color, onClick }: IconProps) => {
    return (<img
        src={Icons[name]}
        alt={name}
        width={width}
        height={height}
        className={cn("global-icon", className)}
        onClick={onClick}
        style={{
            width: width,
            height: height,
            color: color,
        }}
    />)
};