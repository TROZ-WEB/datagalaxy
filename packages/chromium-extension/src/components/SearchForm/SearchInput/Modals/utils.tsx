import React from 'react';
import DGGlyph from '../../../ui/DGGlyph';

export const moduleFields = [
    {
        id: 'Glossary',
        label: chrome.i18n.getMessage(`module_glossary`),
        icon: <DGGlyph icon="Glossary" kind="glossary" title={chrome.i18n.getMessage(`module_glossary`)} />,
    },
    {
        id: 'Catalog',
        label: chrome.i18n.getMessage(`module_catalog`),
        icon: <DGGlyph icon="Catalog" kind="catalog" title={chrome.i18n.getMessage(`module_catalog`)} />,
    },
    {
        id: 'Processing',
        label: chrome.i18n.getMessage(`module_processing`),
        icon: <DGGlyph icon="Processing" kind="processing" title={chrome.i18n.getMessage(`module_processing`)} />,
    },
    {
        id: 'Usage',
        label: chrome.i18n.getMessage(`module_usage`),
        icon: <DGGlyph icon="Software" kind="usage" title={chrome.i18n.getMessage(`module_usage`)} />,
    },
];

export const test = [];

export const useSortArray = () => {
    const sortArray = (array) => {
        array?.sort((a, b) => {
            if (a.label < b.label) return -1;
            if (a.label > b.label) return 1;

            return 0;
        });
    };

    return { sortArray };
};
