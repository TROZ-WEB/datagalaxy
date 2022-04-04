import { AttributeDefinitionType, AttributeType } from '../Attributes/types';
import { get } from '../Http';
import { EntityType } from './types';

/* eslint-disable import/prefer-default-export */
export type { EntityType, FieldStatus, ExactMatch } from './types';
/* eslint-disable import/prefer-default-export */
export type { AttributeType, AttributeDefinitionType } from '../Attributes/types';

/**
 * Format the breadcrumd in the form 'Database > Modèle'
 *
 * @param {string} path - Represents the raw path as '\\Database\\Modèle\\Table'
 * @return {string} Path as a breadcrumb
 */

export const formatBreadcrumb = (pathAsArray: string[]): { shorten: string[]; default: string[] } => {
    const base = JSON.parse(JSON.stringify(pathAsArray));

    let pathToString = base.toString();

    const maxCharacters = 45;

    let security = 0;
    while (pathToString.length + 2 * base.length - 1 > maxCharacters && security < 10) {
        security++;

        const index = Math.floor(base.length / 2);

        const nextBase = JSON.parse(JSON.stringify(base)); // Used to check if that's the last iteration
        nextBase.splice(index, 1);

        const nextPathAsString = nextBase.toString();

        if (nextPathAsString.length + 2 * nextBase.length - 1 > maxCharacters) {
            base.splice(index, 1);
        } else if (base.length === 2) {
            // eslint-disable-next-line prefer-destructuring
            base[2] = base[1];
            base[1] = '...';
            break;
        } else {
            base[index] = '...';
        }

        pathToString = base.toString();
    }

    return {
        default: pathAsArray,
        shorten: base,
    };
};

export interface customFieldAttr {
    [key: string]: { glyph: string; kind: 'Catalog' | 'Processing' | 'Glossary' | 'Usage' };
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
    Relational: { glyph: 'Database', kind: 'Catalog' },
    NonRelational: { glyph: 'Filestore', kind: 'Catalog' },
    NoSql: { glyph: 'Nosql', kind: 'Catalog' },
    TagBase: { glyph: 'Tagbase', kind: 'Catalog' },
    Model: { glyph: 'Model', kind: 'Catalog' },
    Directory: { glyph: 'Containerfolder', kind: 'Catalog' },
    Table: { glyph: 'Table', kind: 'Catalog' },
    View: { glyph: 'View', kind: 'Catalog' },
    Column: { glyph: 'Columnview', kind: 'Catalog' },
    Field: { glyph: 'UsageField', kind: 'Catalog' },
    SubStructure: { glyph: 'SubStructure', kind: 'Catalog' },
    File: { glyph: 'File', kind: 'Catalog' },
    Document: { glyph: 'Document', kind: 'Catalog' },
    Equipment: { glyph: 'Equipment', kind: 'Catalog' },
    Tag: { glyph: 'Tag', kind: 'Catalog' },
    /* Traitement (technique) */
    DataFlow: { glyph: 'DataFlow', kind: 'Processing' },
    DataProcessing: { glyph: 'Processing', kind: 'Processing' },
    DataProcessingItem: { glyph: 'Processitem', kind: 'Processing' },
    /* Usage (fonctionnel) */
    Application: { glyph: 'SoftwareApplication', kind: 'Usage' },
    Usage: { glyph: 'Software', kind: 'Usage' },
    Use: { glyph: 'Software', kind: 'Usage' },
    Process: { glyph: 'Process', kind: 'Usage' },
    UsageField: { glyph: 'UsageField', kind: 'Usage' },
    Feature: { glyph: 'Features', kind: 'Usage' },
    Screen: { glyph: 'SoftwareScreen', kind: 'Usage' },
    Dashboard: { glyph: 'SoftwareDashboard', kind: 'Usage' },
    Report: { glyph: 'Report', kind: 'Usage' },
    DataSet: { glyph: 'Dataset', kind: 'Usage' },
    OpenDataSet: { glyph: 'Opendataset', kind: 'Usage' },
    Algorithm: { glyph: 'Algorithm', kind: 'Usage' },
    UsageComponent: { glyph: 'UsageComponent', kind: 'Usage' },
    Diagram: { glyph: 'Diagram', kind: 'Usage' },
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
