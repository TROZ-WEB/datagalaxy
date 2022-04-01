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

const WorkspaceIcon = ({ hash, title }) => {
    const url = useStoreState((state) => state.auth.pubapi);

    return <SIcon src={`${url}/image?hash=${encodeURIComponent(hash)}`} title={title} />;
};

export default WorkspaceIcon;
