import React from 'react';
import styled from 'styled-components';
import Tooltip from './Tooltip';

const TooltipRoot = styled.div`
    padding: 2px;
    display: flex;
    flex-direction: column;
    max-width: 200px;
`;

const TooltipHeader = styled.div`
    font-weight: bold;
    opacity: 0.5;
`;

const TooltipContent = styled.div`
    margin-top: 3px;
    font-weight: normal;
`;

interface TooltipInformationsProps {
    id: string;
    header: string;
    informations: string;
}

const TooltipInformations = ({ id, header, informations }: TooltipInformationsProps) => (
    <Tooltip html={false} id={id}>
        <TooltipRoot>
            <TooltipHeader>{header}</TooltipHeader>
            <TooltipContent>{informations}</TooltipContent>
        </TooltipRoot>
    </Tooltip>
);

export default TooltipInformations;
