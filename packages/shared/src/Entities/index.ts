import { AttributeDefinitionType, AttributeType } from '../Attributes/types';
import { get } from '../Http';
import { EntityType } from './types';

/* eslint-disable import/prefer-default-export */
export type { EntityType, FieldStatus } from './types';
/* eslint-disable import/prefer-default-export */
export type { AttributeType, AttributeDefinitionType } from '../Attributes/types';

/**
 * Format the breadcrumd in the form 'Database > Modèle'
 *
 * @param {string} path - Represents the raw path as '\\Database\\Modèle\\Table'
 * @return {string} Path as a breadcrumb
 */

export const formatBreadcrumb = (path: string): { shorten: string[]; default: string[] } => {
    const base = path.trim().split('\\').slice(0, -1).filter(Boolean);
    let pathWithoutFirstElement = base.toString();

    const maxCharacters = 50;

    let security = 0;

    while (pathWithoutFirstElement.length + 2 * (base.length - 1) > maxCharacters && security < 10) {
        security++;

        const index = Math.floor(base.length / 2);

        const nextBase = JSON.parse(JSON.stringify(base)); // Used to check if that's the last iteration
        nextBase.splice(index, 1);
        const nextPathWithoutFirstElement = nextBase.toString();

        if (nextPathWithoutFirstElement.length + 2 * (nextBase.length - 1) > maxCharacters) {
            base.splice(index, 1);
        } else {
            base[index] = '...';
        }

        pathWithoutFirstElement = base.toString();
    }

    return {
        default: path.trim().split('\\').slice(0, -1).filter(Boolean),
        shorten: base,
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

export const getAttributesValues = async (
    apiUrl: string,
    attributeDataType: string,
    attributeKey: string,
): Promise<AttributeType[]> => {
    try {
        const response = await get<AttributeType[]>(
            `${apiUrl}/attributes/values?dataType=${attributeDataType}&attributeKey=${attributeKey}`,
        );

        return response.parsedBody;
    } catch (error) {
        console.error(error);
    }

    return null;
};

export const getAttributes = async (
    apiUrl: string,
    route: string,
    dataType: string,
): Promise<AttributeDefinitionType[]> => {
    try {
        const response = await get<AttributeDefinitionType[]>(`${apiUrl}/${route}?dataType=${dataType}`);

        return response.parsedBody;
    } catch (error) {
        console.error(error);
    }

    return null;
};
