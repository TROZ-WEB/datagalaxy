import React from 'react';
import styled from 'styled-components';
import SearchForm from '../../components/SearchForm';

/* ---------- STYLES ---------- */

const SRoot = styled.div`
    height: inherit;
    box-sizing: border-box;
    padding: 20px 11px 0px 20px;
    overflow: scroll;
    display: flex;
    flex-direction: column;
    height: calc(100% - 60px);
`;

/* ---------- COMPONENT ---------- */

const Search = () => {
    return (
        <SRoot>
            <SearchForm />
        </SRoot>
    );
};

export default Search;
