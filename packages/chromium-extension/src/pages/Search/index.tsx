import React from 'react';
import styled from 'styled-components';
import SearchForm from '../../components/SearchForm';

/* ---------- STYLES ---------- */

const SRoot = styled.div`
    padding: 20px 18px;
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
