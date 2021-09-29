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
    [key: string]: { glyph: string; kind: 'Functional' | 'Technical' };
}

/**
 * Mapping between field type and associated glyph and kind (Technical or Functional)
 */
export const entitiesTypeRelatedInfos: customFieldAttr = {
    /* Glossaire (fonctionnel) */
    Universe: { glyph: 'Universe', kind: 'Functional' },
    Concept: { glyph: 'Concept', kind: 'Functional' },
    ReferenceData: { glyph: 'Value', kind: 'Functional' },
    IndicatorGroup: { glyph: 'IndicatorGroup', kind: 'Functional' },
    ReferenceDataValue: { glyph: 'Value', kind: 'Functional' },
    BusinessTerm: { glyph: 'Term', kind: 'Functional' },
    Indicator: { glyph: 'Indicator', kind: 'Functional' },
    Dimension: { glyph: 'Dimension', kind: 'Functional' },
    BusinessDomain: { glyph: 'Domain', kind: 'Functional' },
    DimensionGroup: { glyph: 'DimensionGroup', kind: 'Functional' },
    BusinessDomainGroup: { glyph: 'DomainGroup', kind: 'Functional' },
    /* Dictionnaire (technique) */
    Relational: { glyph: 'Database', kind: 'Technical' },
    NonRelational: { glyph: 'Filestore', kind: 'Technical' },
    NoSql: { glyph: 'Nosql', kind: 'Technical' },
    TagBase: { glyph: 'Tagbase', kind: 'Technical' },
    Model: { glyph: 'Model', kind: 'Technical' },
    Directory: { glyph: 'Containerfolder', kind: 'Technical' },
    Table: { glyph: 'Table', kind: 'Technical' },
    View: { glyph: 'View', kind: 'Technical' },
    Column: { glyph: 'Columnview', kind: 'Technical' },
    Field: { glyph: 'UsageField', kind: 'Technical' },
    SubStructure: { glyph: 'SubStructure', kind: 'Technical' },
    File: { glyph: 'File', kind: 'Technical' },
    Document: { glyph: 'Document', kind: 'Technical' },
    Equipment: { glyph: 'Equipment', kind: 'Technical' },
    Tag: { glyph: 'Tag', kind: 'Technical' },
    /* Traitement (technique) */
    DataFlow: { glyph: 'DataFlow', kind: 'Technical' },
    DataProcessing: { glyph: 'Dataprocessing', kind: 'Technical' },
    DataProcessingItem: { glyph: 'Processitem', kind: 'Technical' },
    /* Usage (fonctionnel) */
    Application: { glyph: 'SoftwareApplication', kind: 'Functional' },
    Use: { glyph: 'Software', kind: 'Functional' },
    Process: { glyph: 'Process', kind: 'Functional' },
    UsageField: { glyph: 'UsageField', kind: 'Functional' },
    Feature: { glyph: 'Features', kind: 'Functional' },
    Screen: { glyph: 'SoftwareScreen', kind: 'Functional' },
    Dashboard: { glyph: 'SoftwareDashboard', kind: 'Functional' },
    Report: { glyph: 'Report', kind: 'Functional' },
    DataSet: { glyph: 'Dataset', kind: 'Functional' },
    OpenDataSet: { glyph: 'Opendataset', kind: 'Functional' },
    Algorithm: { glyph: 'Algorithm', kind: 'Functional' },
    UsageComponent: { glyph: 'UsageComponent', kind: 'Functional' },
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
