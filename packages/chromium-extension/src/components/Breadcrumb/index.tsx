import React, { useMemo } from 'react';
import { formatBreadcrumb, WorkspaceType } from 'shared';
import styled from 'styled-components';
import { useStoreState } from '../../store/hooks';

/* ---------- STYLES ---------- */

const SChevron = styled.span`
    position: relative;
    top: 1px;
    padding-right: 2px;
    padding-left: 2px;
    font-family: 'datagalaxy', sans-serif;
    color: #6d6f88;
    font-size: 10px;
`;

const SRoot = styled.div`
    color: #6d6f88;
    font-size: 8px;
    display: flex;
    flex-direction: row;
    align-items: end;
    flex-wrap: wrap;
`;

const SFormatted = styled.span`
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    max-width: 250px;
`;

const SWorkspaceImage = styled.img`
    width: 20px;
    height: 20px;
    margin-right: -5px;
`;

const formatText = (formattedPath: any) => {
    const text = formattedPath.shorten.map((elem, i) => (
        <>
            {elem}
            <SChevron>{i < formattedPath.shorten.length - 1 && ''}</SChevron>
        </>
    ));

    return text;
};

/* ---------- COMPONENT ---------- */

const Breadcrumb = ({ path, workspace }: { path: string[]; workspace: WorkspaceType }) => {
    const formattedPath = useMemo(() => (path ? formatBreadcrumb(path) : null), [path]);
    const url = useStoreState((state) => state.auth.pubapi);

    return (
        <div>
            {formattedPath && (
                <SRoot title={path.join(' > ')}>
                    {workspace?.imageHash && (
                        <SWorkspaceImage
                            alt="workspace-image"
                            src={`${url}/image?hash=${workspace?.imageHash}`}
                            title={workspace?.name}
                        />
                    )}
                    {formattedPath && formattedPath.shorten.length ? (
                        <SFormatted>
                            {workspace?.imageHash && <SChevron></SChevron>}
                            {formatText(formattedPath)}
                        </SFormatted>
                    ) : (
                        <br />
                    )}
                </SRoot>
            )}
        </div>
    );
};

export default Breadcrumb;
