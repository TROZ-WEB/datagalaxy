import React from 'react';
import DGGlyph from '../../../ui/DGGlyph';

export const moduleFields = [
    {
        id: 'Glossary',
        label: chrome.i18n.getMessage(`module_glossary`),
        icon: <DGGlyph icon="Glossary" kind="glossary" margin={1} />,
    },
    {
        id: 'Catalog',
        label: chrome.i18n.getMessage(`module_catalog`),
        icon: <DGGlyph icon="Catalog" kind="catalog" margin={1} />,
    },
    {
        id: 'Processing',
        label: chrome.i18n.getMessage(`module_processing`),
        icon: <DGGlyph icon="Processing" kind="processing" margin={1} />,
    },
    {
        id: 'Usage',
        label: chrome.i18n.getMessage(`module_usage`),
        icon: <DGGlyph icon="Software" kind="usage" margin={1} />,
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
