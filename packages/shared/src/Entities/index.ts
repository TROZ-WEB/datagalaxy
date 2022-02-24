import { get } from '../Http';
import { EntityType } from './types';

/* eslint-disable import/prefer-default-export */
export type { EntityType, FieldStatus } from './types';

const ellipseAt = (at: number) => (item) => item.slice(0, at);

/**
 * Format the breadcrumd in the form 'Database > Modèle'
 *
 * @param {string} path - Represents the raw path as '\\Database\\Modèle\\Table'
 * @param {number} threshold - Threshold from which path is ellipsed
 * @param {number} ellipse - Ellipsed each level text
 * @return {string} Path as a breadcrumb
 */
export const formatBreadcrumb = (
    path: string,
    threshold: number = 3,
    ellipse?: number,
): { shorten: string[]; default: string[] } => {
    const base = path.trim().split('\\').slice(0, -1).filter(Boolean);
    let shorten = ellipse ? base.map(ellipseAt(ellipse)) : base;

    if (shorten.length > threshold) {
        shorten = [shorten[0], '...', ...shorten.slice(shorten.length - 2, shorten.length)];
    }

    return {
        default: base,
        shorten,
    };
};

export interface customFieldAttr {
    [key: string]: { glyph: string; kind: 'Dictionary' | 'Dataprocessing' | 'Glossary' | 'Uses' };
}

/**
 * Mapping between field type and associated glyph and kind (Technical or Functional)
 */
export const entitiesTypeRelatedInfos: customFieldAttr = {
    /* Glossaire (fonctionnel) */
    Universe: { glyph: 'Universe', kind: 'Glossary' },
    Concept: { glyph: 'Concept', kind: 'Glossary' },
    ReferenceData: { glyph: 'Value', kind: 'Glossary' },
    IndicatorGroup: { glyph: 'IndicatorGroup', kind: 'Glossary' },
    ReferenceDataValue: { glyph: 'Value', kind: 'Glossary' },
    BusinessTerm: { glyph: 'Term', kind: 'Glossary' },
    Indicator: { glyph: 'Indicator', kind: 'Glossary' },
    Dimension: { glyph: 'Dimension', kind: 'Glossary' },
    BusinessDomain: { glyph: 'Domain', kind: 'Glossary' },
    DimensionGroup: { glyph: 'DimensionGroup', kind: 'Glossary' },
    BusinessDomainGroup: { glyph: 'DomainGroup', kind: 'Glossary' },
    /* Dictionnaire (technique) */
    Relational: { glyph: 'Database', kind: 'Dictionary' },
    NonRelational: { glyph: 'Filestore', kind: 'Dictionary' },
    NoSql: { glyph: 'Nosql', kind: 'Dictionary' },
    TagBase: { glyph: 'Tagbase', kind: 'Dictionary' },
    Model: { glyph: 'Model', kind: 'Dictionary' },
    Directory: { glyph: 'Containerfolder', kind: 'Dictionary' },
    Table: { glyph: 'Table', kind: 'Dictionary' },
    View: { glyph: 'View', kind: 'Dictionary' },
    Column: { glyph: 'Columnview', kind: 'Dictionary' },
    Field: { glyph: 'UsageField', kind: 'Dictionary' },
    SubStructure: { glyph: 'SubStructure', kind: 'Dictionary' },
    File: { glyph: 'File', kind: 'Dictionary' },
    Document: { glyph: 'Document', kind: 'Dictionary' },
    Equipment: { glyph: 'Equipment', kind: 'Dictionary' },
    Tag: { glyph: 'Tag', kind: 'Dictionary' },
    /* Traitement (technique) */
    DataFlow: { glyph: 'DataFlow', kind: 'Dataprocessing' },
    DataProcessing: { glyph: 'Dataprocessing', kind: 'Dataprocessing' },
    DataProcessingItem: { glyph: 'Processitem', kind: 'Dataprocessing' },
    /* Usage (fonctionnel) */
    Application: { glyph: 'SoftwareApplication', kind: 'Uses' },
    Use: { glyph: 'Software', kind: 'Uses' },
    Process: { glyph: 'Process', kind: 'Uses' },
    UsageField: { glyph: 'UsageField', kind: 'Uses' },
    Feature: { glyph: 'Features', kind: 'Uses' },
    Screen: { glyph: 'SoftwareScreen', kind: 'Uses' },
    Dashboard: { glyph: 'SoftwareDashboard', kind: 'Uses' },
    Report: { glyph: 'Report', kind: 'Uses' },
    DataSet: { glyph: 'Dataset', kind: 'Uses' },
    OpenDataSet: { glyph: 'Opendataset', kind: 'Uses' },
    Algorithm: { glyph: 'Algorithm', kind: 'Uses' },
    UsageComponent: { glyph: 'UsageComponent', kind: 'Uses' },
};

export const fetchEntity = async (apiUrl: string, location: string): Promise<any> => {
    try {
        const response = await get<EntityType>(`${apiUrl}/${location}`);

        return response.parsedBody;
    } catch (error) {
        console.error(error);
    }

    return null;
};
