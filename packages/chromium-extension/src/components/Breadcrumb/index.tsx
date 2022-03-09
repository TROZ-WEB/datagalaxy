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

/* ---------- COMPONENT ---------- */

const Breadcrumb = ({ path }: { path: string }) => {
    const formattedPath = useMemo(() => (path ? formatBreadcrumb(path) : null), [path]);

    return (
        <div>
            {formattedPath && (
                <SRoot title={formattedPath.default.join(' > ')}>
                    {formattedPath && formattedPath.shorten.length ? (
                        formattedPath.shorten.map((elem, i) => (
                            <Fragment key={elem}>
                                <span>{elem}</span>
                                <SChevron>{i < formattedPath.shorten.length - 1 && ''}</SChevron>
                            </Fragment>
                        ))
                    ) : (
                        <br />
                    )}
                </SRoot>
            )}
        </div>
    );
};

export default Breadcrumb;
