import React from 'react';
import styled from 'styled-components';
import keyListener from '../../utils';

/* ---------- STYLES ---------- */

const SHelperTextError = styled.p`
    color: #cd3835;
    font-size: 0.75rem;
    margin-bottom: 3px;
`;

const SInput = styled.input`
    background: #ffffff;
    border: 1px solid rgba(2, 42, 142, 0.1);
    box-sizing: border-box;
    height: 42px;
    border-radius: 3px;
    padding: 16px;
    font-family: 'Montserrat', sans-serif;

    &:disabled {
        color: #6d6f88;
    }
`;

const SLabel = styled.label`
    font-size: 12px;
    line-height: 18px;
    display: flex;
    align-items: center;
    text-align: center;
    color: #1035b1;
    font-weight: 700;
`;

const SRoot = styled.div`
    display: flex;
    flex-direction: column;
    margin-top: 8px;
`;

/* ---------- COMPONENT ---------- */

interface InputProps {
    id: string;
    name: string;
    label: string | React.ReactNode;
    type?: string;
    placeholder?: string;
    errors?: Object;
    disabled?: boolean;
    readOnly?: boolean;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
    ({ label, name, type = 'text', errors, placeholder, disabled = false, readOnly = false, id, ...rest }, ref) => {
        return (
            <SRoot>
                <SLabel htmlFor={name}>{label}</SLabel>
                {errors && errors[name] && <SHelperTextError>{errors[name].message}</SHelperTextError>}
                <SInput
                    ref={ref}
                    disabled={disabled || readOnly}
                    id={id}
                    name={name}
                    placeholder={placeholder}
                    readOnly={readOnly}
                    type={type}
                    {...rest}
                    onBlur={() => {
                        window.removeEventListener('keypress', keyListener, true);
                        window.removeEventListener('keydown', keyListener, true);
                        window.removeEventListener('keyup', keyListener, true);
                    }}
                    onFocus={() => {
                        window.addEventListener('keypress', keyListener, true);
                        window.addEventListener('keydown', keyListener, true);
                        window.addEventListener('keyup', keyListener, true);
                    }}
                />
            </SRoot>
        );
    },
);

export default Input;
