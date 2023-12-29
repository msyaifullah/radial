import * as React from "react";
import {ButtonProps} from "./button.types";

const buttonDefaultStyles = {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContents: 'center',
    border: 'none',
    borderRadius: '4px',
};

const buttonSizes = {
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


/**
 * Primary UI component for user interaction 
 */
const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
    ({className, type, ...props}, ref) => {

        const {children, variant = 'medium', ...rest} = props;
        const buttonStyles = {
            ...rest.style,
            ...buttonDefaultStyles,
            ...buttonSizes[variant],
        }
        return (
            <button
                ref={ref}
                style={buttonStyles}
                type={type}
                {...rest}
                {...props}
            >
                {children}
            </button>
        )
    }
)

Button.displayName = "Button";

export {Button, type ButtonProps};
