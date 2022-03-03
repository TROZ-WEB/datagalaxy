import React from 'react';
import styled from 'styled-components';
import Glyph from '../../../ui/Glyph';

/* ---------- STYLES ---------- */

const SRoot = styled.button`
    width: 36px;
    height: 36px;
    font-size: 16px;
    border-radius: 30px;
    border: none;
    color: #1035b1;
    display: flex;
    align-items: center;
    justify-content: center;
    background: transparent;
    position: relative;
    margin: 0 0 8px 0;
    align-self: center;
    font-family: 'Montserrat', sans-serif;

    &:hover,
    &:focus {
        background: #cfd6e9;
        border: none;
        cursor: pointer;
    }

    &:disabled {
        color: #cfd6e9;
        &:hover {
            background: transparent;
        }
    }

    ${(props) => props.active && `background: #CFD6E9`}
`;

const SBadge = styled.span`
    background-color: #989cd9;
    height: 16px;
    width: 16px;
    border-radius: 16px;
    font-size: 7px;
    color: #ffffff;
    font-weight: 700;
    display: flex;
    align-items: center;
    justify-content: center;
    position: absolute;
    right: 0;
    bottom: 0;
`;

/* ---------- COMPONENT ---------- */

interface Props {
    variant?: 'active' | '';
    onClick?: () => void;
    icon: string;
    badgeCount?: number;
}

const VerticalMenuButton: React.FC<Props> = ({ onClick, icon, variant, badgeCount, ...rest }) => {
    return (
        <SRoot active={variant === 'active'} disabled={badgeCount === 0} onClick={onClick} type="button" {...rest}>
            <Glyph icon={icon} />
            {badgeCount > 0 && <SBadge>{badgeCount > 99 ? '99+' : badgeCount}</SBadge>}
        </SRoot>
    );
};

export default VerticalMenuButton;
