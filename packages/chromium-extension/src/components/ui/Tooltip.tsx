import React from 'react';
import ReactTooltip from 'react-tooltip';
import styled from 'styled-components';

export const ReactTooltipStyled = styled(ReactTooltip)`
    &.type-dark.place-top {
        padding: 0.3rem 1rem;
    }
`;

export const rebuildTooltip = () => {
    ReactTooltip.rebuild();
};

const Tooltip = () => {
    return <ReactTooltipStyled backgroundColor="#001030" html={true} multiline={true} />;
};

export default Tooltip;
