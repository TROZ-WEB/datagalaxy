import React from 'react';
import ReactTooltip from 'react-tooltip';
import styled from 'styled-components';

export const ReactTooltipStyled = styled(ReactTooltip)`
    padding: 5px !important;
    font-size: 12px !important;
`;

export const rebuildTooltip = () => {
    ReactTooltip.rebuild();
};

export const closeTooltips = () => {
    ReactTooltip.hide();
};

const Tooltip = () => {
    return (
        <ReactTooltipStyled
            arrowColor="transparent"
            backgroundColor="#001030"
            delayShow={500}
            effect="solid"
            offset={{ top: -10 }}
            place="top"
            type="dark"
            html
            multiline
        />
    );
};

export default Tooltip;
