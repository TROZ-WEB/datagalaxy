import React, { useMemo } from 'react';
import { formatBreadcrumb, Workspace } from 'shared';
import styled from 'styled-components';
import { useStoreState } from '../../store/hooks';
import WorkspaceIconPlaceholder from '../WorkspaceIconPlaceholder';

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
    align-items: center;
`;

const SFormatted = styled.span`
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    max-width: 260px;
`;

const SWorkspaceImage = styled.img`
    border-radius: 3px;
    width: 16px;
    height: 16px;
`;

const formatText = (formattedPath: any) => {
    const text = formattedPath.shorten.map((elem, i) => (
        /* eslint-disable-next-line react/no-array-index-key */
        <React.Fragment key={i}>
            {elem}
            <SChevron>{i < formattedPath.shorten.length - 1 && ''}</SChevron>
        </React.Fragment>
    ));

    return text;
};

/* ---------- COMPONENT ---------- */

const Breadcrumb = ({ path, workspace }: { path: string[]; workspace: Workspace }) => {
    const formattedPath = useMemo(() => (path ? formatBreadcrumb(path) : null), [path]);
    const url = useStoreState((state) => state.auth.pubapi);

    return (
        <div>
            {formattedPath && (
                <SRoot title={path.join(' > ')}>
                    {workspace?.iconHash ? (
                        <SWorkspaceImage
                            alt="workspace-image"
                            src={`${url}/image?hash=${encodeURIComponent(workspace?.iconHash)}`}
                            title={workspace?.name}
                        />
                    ) : (
                        <WorkspaceIconPlaceholder title={workspace?.name} workspaceTrigram={workspace?.trigram} />
                    )}
                    {formattedPath && formattedPath.shorten.length !== 0 ? (
                        <SFormatted>
                            <SChevron></SChevron>
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
