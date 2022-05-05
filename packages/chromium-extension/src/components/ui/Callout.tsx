import React from 'react';
import styled from 'styled-components';

/* ---------- STYLES ---------- */

const SIcon = styled.img`
    width: 16px;
    height: 16px;
    margin-right: 16.5px;
`;

const SRoot = styled.div`
    background: #ffffff;
    box-shadow: 0px 0px 2px 2px rgba(0, 76, 255, 0.08);
    border-radius: 3px;
    display: flex;
    flex-direction: row;
    align-items: center;
    padding: 13px 16px;
    margin-top: 13px;
    font-size: 10px;
    line-height: 12px;
`;

/* ---------- COMPONENT ---------- */

interface Props {
    children: React.ReactNode;
    icon?: string;
    iconAltText?: string;
}

const Callout: React.FC<Props> = ({ children, icon, iconAltText }) => {
    return (
        <SRoot>
            <SIcon alt={iconAltText} src={icon} />
            {children}
        </SRoot>
    );
};

export default Callout;
