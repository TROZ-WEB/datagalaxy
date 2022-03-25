import React from 'react';
import styled from 'styled-components';
import { useStoreState } from '../../../../store/hooks';

/* ---------- STYLES ---------- */

const SIcon = styled.img`
    width: 20px;
    height: 20px;
    border-radius: 50%;
`;

/* ---------- COMPONENT ---------- */

const FieldIcon = ({ hash }) => {
    const url = useStoreState((state) => state.auth.pubapi);

    return <SIcon src={`${url}/image?hash=${encodeURIComponent(hash)}`} />;
};

export default FieldIcon;
