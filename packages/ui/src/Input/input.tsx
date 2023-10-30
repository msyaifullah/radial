import * as React from "react"
import {InputProps} from "./input.types";


const inputDefaultStyles = {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContents: 'center',
    borderRadius: '4px',
    height: '100px',
};

const inputSizes = {
    small: {
        height: '28px',
        fontSize: '14px',
        padding: '3px 16px'
    },
    medium: {
        height: '36px',
        fontSize: '16px',
        padding: '4px 20px'
    },
    large: {
        height: '48px',
        fontSize: '20px',
        padding: '5px 24px'
    },
};

const Input = React.forwardRef<HTMLInputElement, InputProps>(
    ({ className, type, ...props }, ref) => {
        const {children, variant = 'medium', ...rest} = props;
        const inputStyles = {
            ...rest.style,
            ...inputDefaultStyles,
            ...inputSizes[variant]
        }
        return (
            <input
                ref={ref}
                style={inputStyles}
                type={type}
                {...rest}
                {...props}
            />
        )
    }
)
Input.displayName = "Input"

export { Input, type InputProps }

