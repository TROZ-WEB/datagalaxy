import React from 'react';
import styled from 'styled-components';
import { useStoreState } from '../../../store/hooks';

/* ---------- STYLES ---------- */

const SColorPoint = styled.span`
    width: 10px;
    height: 10px;
    border-radius: 50%;
    margin-right: 5px;

    ${(props) => props.withBorder && `border: 1px solid #001030;`}
`;

const SRoot = styled.div`
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    align-items: center;
`;

const SRootItem = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    margin-right: 2px;
    margin-top: 4px;
`;

const STagLabel = styled.span`
    font-size: 12px;
`;

/* ---------- COMPONENT ---------- */

const Tags = ({ children, className }: { children: React.ReactNode; className?: string }) => {
    return <SRoot className={className}>{children}</SRoot>;
};

Tags.Item = ({ tag, hideLabel = false }: { tag: string; hideLabel?: boolean }) => {
    const tags = useStoreState((state) => state.auth.tags);

    const { color } = tags?.find(({ label }) => label === tag);

    return (
        <SRootItem>
            <SColorPoint
                style={{
                    backgroundColor: color,
                }}
                title={tag}
                withBorder={color === 'white'}
            />
            {!hideLabel && <STagLabel>{tag}</STagLabel>}
        </SRootItem>
    );
};

export default Tags;
