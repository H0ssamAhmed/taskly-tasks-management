import type { ReactNode } from "react";
import { cn } from "../../lib/utils";

type ButtonVariant = "primary" | "secondary" | "ghost";
type ButtonSize = "sm" | "md" | "lg";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    children?: ReactNode;
    variant?: ButtonVariant;
    size?: ButtonSize;
    className?: string;
}

const variants: Record<ButtonVariant, string> = {
    primary: "bg-gradient-to-r from-primary to-primary-container text-white hover:bg-primary/90 rounded-xs py-2.5 px-60",
    secondary: "bg-surface-low opacity-50",
    ghost: "bg-transparent hover:bg-gray-100 text-black",
};

const sizes: Record<ButtonSize, string> = {
    sm: "px-3 py-1 text-sm py-2.5 px-6",
    md: "px-4 py-2 text-base",
    lg: "px-6 py-3 text-lg",
};

export function Button({
    children,
    variant = "primary",
    size = "md",
    className,
    ...props
}: ButtonProps) {
    return (
        <button
            className={cn(
                "cursor-pointer py-2.5 px-60 p-60",
                variants[variant],
                sizes[size],
                className
            )}
            {...props}
        >
            {children}
        </button>
    );
}