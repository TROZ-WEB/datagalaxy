import React, { FC } from 'react';
import styled from 'styled-components';
import { useStoreState } from '../../../../store/hooks';

/* ---------- STYLES ---------- */

const SIcon = styled.img`
    width: 20px;
    height: 20px;
    border-radius: 50%;
`;

/* ---------- COMPONENT ---------- */

interface Props {
    hash: string;
    tooltip: string;
}

const FieldIcon: FC<Props> = ({ hash, tooltip }) => {
    const url = useStoreState((state) => state.auth.pubapi);

    return <SIcon src={`${url}/image?hash=${encodeURIComponent(hash)}`} title={tooltip} />;
};

export default FieldIcon;
