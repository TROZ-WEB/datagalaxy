import React, { useEffect } from 'react';
import styled from 'styled-components';
import { useStoreDispatch, useStoreState, useStoreActions } from '../../../store/hooks';
import QuickFilter from './QuickFilter';
/* ---------- STYLES ---------- */

const SRoot = styled.div`
    margin-top: 16px;
    overflow-x: scroll;
    display: flex;
    background-color: #f3f6ff;
    padding: 12px;

    &::-webkit-scrollbar-track {
        display: none;
    }

    &::-webkit-scrollbar-thumb {
        display: none;
    }

    &::-webkit-scrollbar-thumb:hover {
        display: none;
    }

    &::-webkit-scrollbar {
        display: none;
    }
`;

/* ---------- COMPONENT ---------- */

const QuickFilters = () => {
    const dispatch = useStoreDispatch();
    const quickFilters = useStoreState((state) => state.quickFilters.quickFilters);
    console.log('result :', quickFilters);

    useEffect(() => {
        const fetchEntity = async () => {
            await dispatch.quickFilters.fetchQuickFilters('');
        };

        fetchEntity();
    }, [dispatch]);

    return (
        <SRoot>
            <QuickFilter icon="Table" kind="dictionary" label="Type" value="Table" />
            <QuickFilter icon="Table" kind="dictionary" label="Type" value="Table" />
            <QuickFilter icon="Table" kind="dictionary" label="Type" value="Table" />
            <QuickFilter icon="Table" kind="dictionary" label="Type" value="Table" />
            <QuickFilter icon="Table" kind="dictionary" label="Type" value="Table" />
        </SRoot>
    );
};

export default QuickFilters;
