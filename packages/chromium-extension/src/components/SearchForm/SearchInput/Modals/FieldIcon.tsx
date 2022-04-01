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
    title: string;
}

const FieldIcon: FC<Props> = ({ hash, title }) => {
    const url = useStoreState((state) => state.auth.pubapi);

    return <SIcon src={`${url}/image?hash=${encodeURIComponent(hash)}`} title={title} />;
};

export default FieldIcon;
