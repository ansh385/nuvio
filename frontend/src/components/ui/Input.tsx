import type { InputHTMLAttributes } from "react";
import "./Input.css";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
    label: string;
    error?: string;
}

function Input({
    label,
    error,
    id,
    ...props
}: InputProps) {
    return (
        <div className="nuvio-input-group">
            <label className="nuvio-input-label" htmlFor={id}>
                {label}
            </label>

            <input
                id={id}
                className={`nuvio-input ${error ? "nuvio-input-error" : ""}`}
                {...props}
            />

            {error && (
                <span className="nuvio-input-error-message">
                    {error}
                </span>
            )}
        </div>
    );
}

export default Input;