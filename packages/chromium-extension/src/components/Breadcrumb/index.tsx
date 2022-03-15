import React, { Fragment, useMemo } from 'react';
import { formatBreadcrumb } from 'shared';
import styled from 'styled-components';

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
    align-items: baseline;
    flex-wrap: wrap;
`;

const SFormatted = styled.span`
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    max-width: 250px;
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

const Breadcrumb = ({ path }: { path: string[] }) => {
    const formattedPath = useMemo(() => (path ? formatBreadcrumb(path) : null), [path]);

    return (
        <div>
            {formattedPath && (
                <SRoot title={formattedPath.default.join(' > ')}>
                    {formattedPath && formattedPath.shorten.length ? (
                        <SFormatted>{formatText(formattedPath)}</SFormatted>
                    ) : (
                        <br />
                    )}
                </SRoot>
            )}
        </div>
    );
};

export default Breadcrumb;
