import React, { FC } from 'react';
import styled from 'styled-components';
import { useStoreState } from '../../../../store/hooks';

/* ---------- STYLES ---------- */

interface SIconProps {
    $margin?: number;
}

const SIcon = styled.img<SIconProps>`
    display: flex;
    width: 20px;
    height: 20px;
    border-radius: 50%;
    margin-inline: ${(props: SIconProps) => props.$margin}px;
`;

/* ---------- COMPONENT ---------- */

interface Props {
    hash: string;
    margin?: number;
}

const FieldIcon: FC<Props> = ({ hash, margin }) => {
    const url = useStoreState((state) => state.auth.pubapi);

    const props = {
        src: `${url}/image?hash=${encodeURIComponent(hash)}`,
    };

    return <SIcon {...props} $margin={margin} />;
};

export default FieldIcon;
