import React from 'react';
import styled, { css } from 'styled-components';
import Glyph from './Glyph/index';

/* ---------- STYLES ---------- */

const SGlyph = styled(Glyph)``;

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
        background: rgba(0, 76, 255, 0.08);
        border: none;
        cursor: pointer;
    }

    ${(props) =>
        props.size === 'XS' &&
        css`
            width: 15px;
            height: 15px;

            ${SGlyph} {
                font-size: 12px;
            }
        `}

    ${(props) =>
        props.variant === 'active' &&
        css`
            background: rgba(2, 42, 142, 0.1);
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
    variant?: 'active' | 'primary' | '';
    size?: 'XS' | 'S' | 'M';
    onClick?: () => void;
    onBlur?: () => void;
    icon: string;
    badgeCount?: number;
    className?: string;
    id?: string;
    tooltip?: string;
}

const RoundButton = React.forwardRef(
    ({ onClick, onBlur, icon, type = 'button', variant, size = 'M', className, id, tooltip, ...rest }: Props, ref) => {
        return (
            <SRoot
                ref={ref}
                className={className}
                id={id}
                onBlur={onBlur}
                onClick={onClick}
                // eslint-disable-next-line react/button-has-type
                size={size}
                data-tip={tooltip}
                type={type}
                variant={variant}
                {...rest}
            >
                <SGlyph icon={icon} />
            </SRoot>
        );
    },
);

export default RoundButton;
