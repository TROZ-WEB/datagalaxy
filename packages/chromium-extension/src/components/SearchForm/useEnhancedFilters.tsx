import React from 'react';
import { EnhancedFilter, entitiesTypeRelatedInfos, PickedFilter, AttributeKey } from 'shared';
import { useStoreState } from '../../store/hooks';
import Avatar from '../Avatar';
import Status from '../Entity/Status';
import ColorPoint from '../ui/ColorPoint';
import DGGlyph from '../ui/DGGlyph';
import FieldIcon from './SearchInput/Modals/FieldIcon';
import { moduleFields } from './SearchInput/Modals/utils';

type UseEnhancedFiltersResult = {
    computeFilters: (filtersArray: PickedFilter[]) => EnhancedFilter[]; // TODO: type it
};

const supportedAttributeKeys = [
    'Workspace',
    'TechnologyCode',
    'Module',
    'EntityType',
    'Domains',
    'DataOwners',
    'DataStewards',
    'EntityStatus',
];

const useEnhancedFilters = (): UseEnhancedFiltersResult => {
    const { technologies, domains, users, status, workspaces } = useStoreState((state) => state.filters);
    const { attributes } = useStoreState((state) => state.auth);

    const computeFilters = (filtersArray: PickedFilter[]) => {
        const enhancedQuickFilters: EnhancedFilter[] = [];
        filtersArray?.forEach(({ filter }) => {
            if (!filter) {
                return;
            }
            const enhancedFilter: EnhancedFilter = {
                filter,
            };
            if (filter.values.length > 0) {
                const value = filter.values[0];
                switch (filter.attributeKey) {
                    case AttributeKey.WORSPACE: {
                        const tempEnhancedFilter = workspaces?.find((item) => item.defaultVersionId === value);
                        const name = chrome.i18n.getMessage(`attribute_key_${filter.attributeKey}`);
                        if (tempEnhancedFilter) {
                            if (tempEnhancedFilter?.imageHash) {
                                enhancedFilter.icon = <FieldIcon hash={tempEnhancedFilter?.imageHash} />;
                            }
                            enhancedFilter.content = tempEnhancedFilter?.name;
                            enhancedFilter.name = name;
                            enhancedFilter.nameUnit = name;
                            enhancedQuickFilters.push(enhancedFilter);
                        } else {
                            enhancedQuickFilters.push({
                                name,
                                nameUnit: name,
                                content: filter.values[0],
                                filter,
                            });
                        }
                        break;
                    }
                    case AttributeKey.TECHNOLOGY: {
                        const tempEnhancedFilter = technologies?.find((item) => item.technologyCode === value);
                        const name = chrome.i18n.getMessage(`attribute_key_${filter.attributeKey}`);
                        if (tempEnhancedFilter) {
                            if (tempEnhancedFilter?.imageHash) {
                                enhancedFilter.icon = <FieldIcon hash={tempEnhancedFilter?.imageHash} margin={-1} />;
                            }
                            enhancedFilter.content = tempEnhancedFilter?.displayName;
                            enhancedFilter.name = name;
                            enhancedFilter.nameUnit = name;
                            enhancedQuickFilters.push(enhancedFilter);
                        } else {
                            enhancedQuickFilters.push({
                                name,
                                nameUnit: name,
                                content: filter.values[0],
                                filter,
                            });
                        }
                        break;
                    }
                    case AttributeKey.MODULE: {
                        const tempEnhancedFilter = moduleFields?.find((item) => item.id === value);
                        const name = chrome.i18n.getMessage(`attribute_key_${filter.attributeKey}`);
                        if (tempEnhancedFilter) {
                            enhancedFilter.icon = tempEnhancedFilter.icon;
                            enhancedFilter.content = tempEnhancedFilter.label;
                            enhancedFilter.name = name;
                            enhancedFilter.nameUnit = name;
                            enhancedQuickFilters.push(enhancedFilter);
                        } else {
                            enhancedQuickFilters.push({
                                name,
                                nameUnit: chrome.i18n.getMessage(`attribute_key_${filter.attributeKey}`),
                                content: filter.values[0],
                                filter,
                            });
                        }
                        break;
                    }
                    case AttributeKey.ENTITY_TYPE: {
                        enhancedFilter.icon = (
                            <DGGlyph
                                icon={entitiesTypeRelatedInfos[value]?.glyph}
                                kind={entitiesTypeRelatedInfos[value]?.kind.toLocaleLowerCase()}
                            />
                        );
                        enhancedFilter.content = chrome.i18n.getMessage(`entity_label_full_${value}`);
                        enhancedFilter.name = chrome.i18n.getMessage(`attribute_key_${filter.attributeKey}`);
                        enhancedFilter.nameUnit = enhancedFilter.name;
                        enhancedQuickFilters.push(enhancedFilter);

                        break;
                    }
                    case AttributeKey.TAGS: {
                        const tempEnhancedFilter = domains?.find((item) => item.id === value);
                        const name = chrome.i18n.getMessage(`attribute_key_${filter.attributeKey}`);
                        const nameUnit = chrome.i18n.getMessage(`attribute_key_unit_${filter.attributeKey}`);
                        if (tempEnhancedFilter) {
                            enhancedFilter.icon = <ColorPoint color={tempEnhancedFilter?.color} />;
                            enhancedFilter.content = tempEnhancedFilter?.label;
                            enhancedFilter.name = name;
                            enhancedFilter.nameUnit = nameUnit;
                            enhancedQuickFilters.push(enhancedFilter);
                        } else {
                            enhancedQuickFilters.push({
                                name,
                                nameUnit,
                                content: filter.values[0],
                                filter,
                            });
                        }
                        break;
                    }
                    case AttributeKey.OWNERS: {
                        const tempEnhancedFilter = users?.owners?.find((item) => item.userId === value);
                        const name = chrome.i18n.getMessage(`attribute_key_${filter.attributeKey}`);
                        const nameUnit = chrome.i18n.getMessage(`attribute_key_unit_${filter.attributeKey}`);
                        if (tempEnhancedFilter) {
                            enhancedFilter.icon = <Avatar showTooltip={false} size="mini" user={tempEnhancedFilter} />;
                            enhancedFilter.content = `${tempEnhancedFilter.firstName} ${tempEnhancedFilter.lastName}`;
                            enhancedFilter.name = name;
                            enhancedFilter.nameUnit = nameUnit;
                            enhancedQuickFilters.push(enhancedFilter);
                        } else {
                            enhancedQuickFilters.push({
                                name,
                                nameUnit,
                                content: filter.values[0],
                                filter,
                            });
                        }
                        break;
                    }
                    case AttributeKey.STEWARDS: {
                        const tempEnhancedFilter = users?.stewards?.find((item) => item.userId === value);
                        const name = chrome.i18n.getMessage(`attribute_key_${filter.attributeKey}`);
                        const nameUnit = chrome.i18n.getMessage(`attribute_key_unit_${filter.attributeKey}`);
                        if (tempEnhancedFilter) {
                            enhancedFilter.icon = <Avatar showTooltip={false} size="mini" user={tempEnhancedFilter} />;
                            enhancedFilter.content = `${tempEnhancedFilter.firstName} ${tempEnhancedFilter.lastName}`;
                            enhancedFilter.name = name;
                            enhancedFilter.nameUnit = nameUnit;
                            enhancedQuickFilters.push(enhancedFilter);
                        } else {
                            enhancedQuickFilters.push({
                                name,
                                nameUnit,
                                content: filter.values[0],
                                filter,
                            });
                        }
                        break;
                    }
                    case AttributeKey.ENTITY_STATUS: {
                        const tempEnhancedFilter = status?.find((item) => item.key === value);
                        const name = chrome.i18n.getMessage(`attribute_key_${filter.attributeKey}`);
                        if (tempEnhancedFilter) {
                            enhancedFilter.icon = <Status status={tempEnhancedFilter.value} hideLabel />;
                            enhancedFilter.content = chrome.i18n.getMessage(
                                `entity_status_${tempEnhancedFilter.value}`,
                            );
                            enhancedFilter.name = name;
                            enhancedFilter.nameUnit = name;
                            enhancedQuickFilters.push(enhancedFilter);
                        } else {
                            enhancedQuickFilters.push({
                                name,
                                nameUnit: name,
                                content: filter.values[0],
                                filter,
                            });
                        }
                        break;
                    }
                    case AttributeKey.LAST_MODIFICATION: {
                        enhancedFilter.content = chrome.i18n.getMessage(`last_modified_${filter.operator}`);
                        enhancedFilter.name = chrome.i18n.getMessage(`attribute_key_${filter.attributeKey}`);
                        enhancedFilter.nameUnit = enhancedFilter.name;
                        enhancedQuickFilters.push(enhancedFilter);
                        break;
                    }

                    default: {
                        const fullAttribute = attributes?.find((a) => a.attributeKey === filter?.attributeKey);

                        enhancedQuickFilters.push({
                            name: fullAttribute?.name || filter.attributeKey,
                            content: filter.values[0],
                            filter,
                        });
                    }
                }
            } else if (filter.attributeKey === 'LastModificationTime') {
                enhancedFilter.content = chrome.i18n.getMessage(`last_modified_${filter.operator}`);
                enhancedFilter.name = chrome.i18n.getMessage(`attribute_key_${filter.attributeKey}`);
                enhancedQuickFilters.push(enhancedFilter);
            } else if (supportedAttributeKeys.includes(filter.attributeKey)) {
                enhancedQuickFilters.push({
                    name: chrome.i18n.getMessage(`attribute_key_${filter.attributeKey}`),
                    filter,
                });
            }
        });

        return enhancedQuickFilters;
    };

    return {
        computeFilters,
    };
};

export default useEnhancedFilters;
