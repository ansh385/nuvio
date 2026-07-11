import type { ButtonHTMLAttributes, ReactNode } from "react";
import "./Button.css";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    children: ReactNode;
    isLoading?: boolean;
}

function Button({
    children,
    isLoading = false,
    disabled,
    ...props
}: ButtonProps) {
    return (
        <button
            className="nuvio-button"
            disabled={disabled || isLoading}
            {...props}
        >
            {isLoading ? "Please wait..." : children}
        </button>
    );
}

export default Button;