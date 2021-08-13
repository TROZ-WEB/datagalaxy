import React, { useState } from 'react';
import { decodePAT, getAccessToken, search } from 'shared';
import styles from './index.css';

const Search = () => {
    const [PAT, setPAT] = useState<string>('');
    const [query, setQuery] = useState<string>('');
    const [total, setTotal] = useState<number>(0);

    const handleSearch = async () => {
        const decodedPat = decodePAT(PAT);
        const accessToken = await getAccessToken(decodedPat.pubapi, PAT);
        const searchResult = await search(decodedPat.pubapi, accessToken, query);

        setTotal(searchResult.total);
    };

    return (
        <>
            {chrome.i18n.getMessage('welcomeMessage')}
            <div className={styles.form}>
                <label className={styles.label} htmlFor="pat">
                    {chrome.i18n.getMessage('pat')}
                </label>
                <input
                    id="pat"
                    name="pat"
                    onChange={(e) => setPAT(e.target.value)}
                    placeholder={chrome.i18n.getMessage('pat')}
                    value={PAT}
                />
                <label className={styles.label} htmlFor="search-query">
                    {chrome.i18n.getMessage('searchQuery')}
                </label>
                <input
                    id="search-query"
                    name="search-query"
                    onChange={(e) => setQuery(e.target.value)}
                    placeholder={chrome.i18n.getMessage('searchQuery')}
                    value={query}
                />
                <label className={styles.label} htmlFor="submit">
                    {chrome.i18n.getMessage('search')}
                </label>
                <button
                    aria-label={chrome.i18n.getMessage('search')}
                    id="submit"
                    name="submit"
                    onClick={handleSearch}
                    type="button"
                >
                    {chrome.i18n.getMessage('search')}
                </button>
            </div>
            <div>Nombre de résultats : {total}</div>
        </>
    );
};

export default Search;
