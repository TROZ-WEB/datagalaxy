import React from 'react';
import SearchForm from '../../components/SearchForm';

const Search = () => {
    return (
        <>
            {chrome.i18n.getMessage('welcomeMessage')}
            <SearchForm />
        </>
    );
};

export default Search;
