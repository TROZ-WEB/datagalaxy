import React from 'react';
import styled from 'styled-components';
import SearchForm from '../../components/SearchForm';

/* ---------- STYLES ---------- */

const SRoot = styled.div`
    padding: 20px 5px 18px 20px;
    overflow: scroll;
    height: 90%;
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
