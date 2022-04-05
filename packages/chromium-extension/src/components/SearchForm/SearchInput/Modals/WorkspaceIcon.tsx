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

const WorkspaceIcon = ({ hash, tooltip }) => {
    const url = useStoreState((state) => state.auth.pubapi);

    return <SIcon data-tip={tooltip} src={`${url}/image?hash=${encodeURIComponent(hash)}`} />;
};

export default WorkspaceIcon;
