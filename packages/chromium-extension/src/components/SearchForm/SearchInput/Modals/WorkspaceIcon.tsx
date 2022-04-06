import React from 'react';
import styled from 'styled-components';
import { useStoreState } from '../../../../store/hooks';

/* ---------- STYLES ---------- */

const SIcon = styled.img`
    width: 16px;
    height: 16px;
    border-radius: 3px;
`;

/* ---------- COMPONENT ---------- */

const WorkspaceIcon = ({ hash, tooltip }: { hash: string; tooltip?: string }) => {
    const url = useStoreState((state) => state.auth.pubapi);

    const props = {
        src: `${url}/image?hash=${encodeURIComponent(hash)}`,
    };

    if (tooltip) {
        props['data-tip'] = tooltip;
    }

    return <SIcon {...props} />;
};

export default WorkspaceIcon;
