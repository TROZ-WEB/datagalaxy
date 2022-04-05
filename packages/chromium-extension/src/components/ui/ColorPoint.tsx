import React, { FC } from 'react';
import styled from 'styled-components';

/* ---------- STYLES ---------- */

const SColorPoint = styled.span`
    display: inline-block;
    width: 10px;
    height: 10px;
    border-radius: 50%;
    margin-right: 5px;
    box-sizing: border-box;
    background-color: ${(props) => (props.color ? props.color : props.defaultColor)};
    ${(props) => props.withBorder && `border: 1px solid #001030;`};
`;

/* ---------- COMPONENT ---------- */

interface Props {
    color: string;
    defaultColor?: string;
    className?: string;
    tooltip?: string;
}

const ColorPoint: FC<Props> = ({ color, tooltip, defaultColor, className }) => {
    return (
        <SColorPoint
            className={className}
            color={color}
            data-tip={tooltip}
            withBorder={color === 'white' || defaultColor === 'white'}
        />
    );
};

export default ColorPoint;
