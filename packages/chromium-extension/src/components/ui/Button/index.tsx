import React from 'react';
import styled, { css } from 'styled-components';

/* ---------- STYLES ---------- */

const SRoot = styled.button`
    padding: 11px 15px;
    border-radius: 3px;
    font-size: 14px;
    line-height: 18px;
    display: flex;
    align-items: center;
    cursor: pointer;
    font-family: 'Montserrat', sans-serif;

    ${(props) =>
        props.variant === 'contained' &&
        css`
            background: linear-gradient(71.97deg, #001aff 11.94%, #084eff 37.82%, #17aeff 85.88%);
            color: #ffffff;
            border: none;
        `}
    ${(props) =>
        props.variant === 'contained' &&
        css`
            &:hover,
            &:focus {
                background: linear-gradient(90deg, #0016d7, #0297e6);
            }
        `}

    ${(props) =>
        props.variant === 'outlined' &&
        css`
            background: none;
            color: #001030;
            border: 1px solid rgba(2, 42, 142, 0.1);
        `}
    ${(props) =>
        props.variant === 'outlined' &&
        css`
            &:hover,
            &:focus {
                background: linear-gradient(71.97deg, #001aff 11.94%, #084eff 37.82%, #17aeff 85.88%);
            }
        `}
`;

/* ---------- COMPONENT ---------- */
interface Props {
    children: React.ReactNode;
    type?: 'button' | 'submit' | 'reset';
    variant?: 'contained' | 'outlined';
    onClick?: () => void;
}

const Button: React.FC<Props> = ({ children, onClick, type = 'button', variant = 'contained', ...rest }) => {
    return (
        <SRoot
            onClick={onClick}
            type={type}
            // eslint-disable-next-line react/button-has-type
            variant={variant}
            {...rest}
        >
            {children}
        </SRoot>
    );
};

export default Button;
