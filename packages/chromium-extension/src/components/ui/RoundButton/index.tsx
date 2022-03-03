import React from 'react';
import styled, { css } from 'styled-components';
import Glyph from '../Glyph/index';

/* ---------- STYLES ---------- */

const SRoot = styled.button`
    width: 30px;
    height: 30px;
    font-size: 16px;
    border-radius: 30px;
    border: none;
    color: #001030;
    display: flex;
    align-items: center;
    justify-content: center;
    background: transparent;
    position: relative;
    font-family: 'Montserrat', sans-serif;

    &:hover,
    &:focus {
        background: rgba(2, 42, 142, 0.1);
        border: none;
        cursor: pointer;
    }

    ${(props) => props.variant === 'active' && `background: rgba(2, 42, 142, 0.1)`}

    ${(props) =>
        props.variant === 'mini' &&
        css`
            width: 20px;
            height: 20px;
            font-size: 12px;
        `}

    ${(props) =>
        props.variant === 'primary' &&
        css`
            background: linear-gradient(71.97deg, #001aff 11.94%, #084eff 37.82%, #17aeff 85.88%);
            color: #ffffff;
        `}
    ${(props) =>
        props.variant === 'primary' &&
        css`
            &:hover,
            &:focus {
                background: linear-gradient(90deg, #0016d7, #0297e6);
            }
        `}
`;

/* ---------- COMPONENT ---------- */

interface Props {
    type?: 'button' | 'submit' | 'reset';
    variant?: 'active' | 'mini' | 'primary' | '';
    onClick?: () => void;
    icon: string;
    badgeCount?: number;
}

const RoundButton: React.FC<Props> = ({ onClick, icon, type = 'button', variant, ...rest }) => {
    return (
        <SRoot
            onClick={onClick}
            type={type}
            // eslint-disable-next-line react/button-has-type
            variant={variant}
            {...rest}
        >
            <Glyph icon={icon} />
        </SRoot>
    );
};

export default RoundButton;
