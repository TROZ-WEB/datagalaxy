import React from 'react';
import styled from 'styled-components';
import SearchForm from '../../components/SearchForm';

/* ---------- STYLES ---------- */

const SRoot = styled.div`
    box-sizing: border-box;
    padding: 20px 11px 0px 20px;
    overflow: scroll;
    display: flex;
    flex-direction: column;
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
