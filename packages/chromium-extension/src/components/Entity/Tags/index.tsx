import React from 'react';
import styled from 'styled-components';
import { useStoreState } from '../../../store/hooks';

/* ---------- STYLES ---------- */

const SColorPoint = styled.span`
    width: 10px;
    height: 10px;
    border-radius: 50%;
    margin-right: 5px;
    box-sizing: border-box;

    ${(props) => props.withBorder && `border: 1px solid #001030;`}
`;

const SRoot = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
`;

const SRootItem = styled.span`
    display: flex;
    flex-direction: row;
    align-items: center;
    margin-right: 8px;
    margin-top: 4px;
    display: flex;
    flex-wrap: wrap;
    padding-right: 4px;
    padding-left: 2px;
    border-radius: 12px 3px 3px 12px;
    background: #0000ff08;
`;

const STagLabel = styled.span`
    font-size: 12px;
`;

/* ---------- COMPONENT ---------- */

const Tags = ({ children, className }: { children: React.ReactNode; className?: string }) => {
    return <SRoot className={className}>{children}</SRoot>;
};

Tags.Item = ({ tag, hideLabel = false }: { tag: string; hideLabel?: boolean }) => {
    let t = tag;
    if (t === 'Finance') {
        // API WORKAROUND 2 : Api return 'Finance' tag in entities, but 'FINANCE' in tags list
        t = 'FINANCE';
    }
    const tags = useStoreState((state) => state.auth.tags);
    const foundTag = tags?.find(({ label }) => label === t);
    const color = foundTag?.color;

    return (
        <SRootItem>
            {foundTag && (
                <SColorPoint
                    style={{
                        backgroundColor: color,
                    }}
                    title={tag}
                    withBorder={color === 'white'}
                />
            )}
            {!hideLabel && <STagLabel>{tag}</STagLabel>}
        </SRootItem>
    );
};

export default Tags;
