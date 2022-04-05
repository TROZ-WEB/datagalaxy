import React from 'react';
import ReactTooltip from 'react-tooltip';
import styled from 'styled-components';

export const ReactTooltipStyled = styled(ReactTooltip)``;

export const rebuildTooltip = () => {
    ReactTooltip.rebuild();
};

const Tooltip = () => {
    return (
        <ReactTooltipStyled
            arrowColor="transparent"
            backgroundColor="#001030"
            delayShow={500}
            effect="solid"
            place="top"
            type="dark"
            html
            multiline
        />
    );
};

export default Tooltip;
