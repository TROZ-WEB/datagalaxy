import React from 'react';
import ReactTooltip, { TooltipProps } from 'react-tooltip';
import styled from 'styled-components';

export const ReactTooltipStyled = styled(ReactTooltip)`
    padding: 5px !important;
    font-size: 12px !important;
    font-family: 'Montserrat', sans-serif;
`;

export const rebuildTooltip = () => {
    ReactTooltip.rebuild();
};

export const closeTooltips = () => {
    ReactTooltip.hide();
};

const overridePosition = (
    position: { left: number; top: number },
    currentEvent: Event,
    currentTarget: EventTarget,
    node: null | HTMLDivElement | HTMLSpanElement,
) => {
    const d = document.documentElement;
    let left = Math.min(d.clientWidth - node.clientWidth, position.left);
    left = Math.max(0, left);
    let top: number;
    if (currentTarget instanceof HTMLElement) {
        top = currentTarget.offsetTop - 25;
    }
    top = Math.max(0, top);

    return { top, left };
};

const Tooltip = ({
    id,
    effect = 'solid',
    html = true,
    children,
}: Pick<TooltipProps, 'id' | 'effect' | 'html' | 'children'>) => {
    return (
        <ReactTooltipStyled
            arrowColor="transparent"
            backgroundColor="#001030"
            delayShow={500}
            effect={effect}
            html={html}
            id={id}
            offset={-10}
            overridePosition={effect === 'float' ? overridePosition : undefined}
            place="top"
            type="dark"
            multiline
        >
            {children}
        </ReactTooltipStyled>
    );
};

export default Tooltip;
