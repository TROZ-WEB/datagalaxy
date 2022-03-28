import React from 'react';
import DGGlyph from '../../../ui/DGGlyph';

export const moduleFields = [
    {
        id: 'Glossary',
        label: chrome.i18n.getMessage(`module_glossary`),
        icon: <DGGlyph icon="Glossary" kind="glossary" />,
    },
    {
        id: 'Catalog',
        label: chrome.i18n.getMessage(`module_catalog`),
        icon: <DGGlyph icon="Catalog" kind="catalog" />,
    },
    {
        id: 'Processing',
        label: chrome.i18n.getMessage(`module_processing`),
        icon: <DGGlyph icon="Processing" kind="processing" />,
    },
    {
        id: 'Usage',
        label: chrome.i18n.getMessage(`module_usage`),
        icon: <DGGlyph icon="Software" kind="usage" />,
    },
];

export const test = [];
