import React, { useMemo } from 'react';
import styled from 'styled-components';
import Glyph from '../../ui/Glyph';

/* ---------- STYLES ---------- */

const SIconWrapper = styled.span`
    width: 20px;
    height: 20px;
`;

const SRoot = styled.div``;

const SGlyph = styled(Glyph)`
    ${(props) => props.icon === 'Help' && `color: #5a5e86`}

    ${(props) => props.icon === 'Redo2' && `color: #ff811a`}

    ${(props) => props.icon === 'Recent' && `color: #28aae2`}

    ${(props) => props.icon === 'CheckCircle1' && `color: #50c516`}

    ${(props) => props.icon === 'CloseCircleFilled' && `color: #ca004a`}
`;

/* ---------- COMPONENT ---------- */

const Status = ({
    status,
    hideLabel = false,
    showTooltip = true,
}: {
    status: string;
    hideLabel?: boolean;
    showTooltip?: boolean;
}) => {
    const iconForStatus = useMemo(() => {
        switch (status) {
            case 'Proposed':
                return <SGlyph icon="Help" />;
            case 'InRevision':
                return <SGlyph icon="Redo2" />;
            case 'InValidation':
                return <SGlyph icon="Recent" />;
            case 'Validated':
                return <SGlyph icon="CheckCircle1" />;
            case 'Obsolete':
                return <SGlyph icon="CloseCircleFilled" />;
        }

        return null;
    }, [status]);

    const props = {};

    if (showTooltip) {
        props['data-tip'] = chrome.i18n.getMessage(`entity_status_${status}`);
    }

    return (
        <SRoot>
            <SIconWrapper {...props}>{iconForStatus}</SIconWrapper>
            {!hideLabel && chrome.i18n.getMessage(`entity_status_${status}`)}
        </SRoot>
    );
};

export default Status;
