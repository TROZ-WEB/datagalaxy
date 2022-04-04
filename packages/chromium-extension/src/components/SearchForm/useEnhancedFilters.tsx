import React from 'react';
import { EnhancedFilter, entitiesTypeRelatedInfos, PickedFilter } from 'shared';
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
            if (filter.values.length > 0) {
                const enhancedFilter: EnhancedFilter = {
                    filter,
                };
                const value = filter.values[0];
                switch (filter.attributeKey) {
                    case 'Workspace': {
                        const tempEnhancedFilter = workspaces?.find((item) => item.defaultVersionId === value);
                        if (tempEnhancedFilter) {
                            if (tempEnhancedFilter?.imageHash) {
                                enhancedFilter.icon = (
                                    <FieldIcon hash={tempEnhancedFilter?.imageHash} title={tempEnhancedFilter?.name} />
                                );
                            }
                            enhancedFilter.content = tempEnhancedFilter?.name;
                            enhancedFilter.name = chrome.i18n.getMessage(`attribute_key_${filter.attributeKey}`);
                            enhancedQuickFilters.push(enhancedFilter);
                        } else {
                            enhancedQuickFilters.push({
                                name: chrome.i18n.getMessage(`attribute_key_${filter.attributeKey}`),
                                content: filter.values[0],
                                filter,
                            });
                        }
                        break;
                    }
                    case 'TechnologyCode': {
                        const tempEnhancedFilter = technologies?.find((item) => item.technologyCode === value);
                        if (tempEnhancedFilter) {
                            if (tempEnhancedFilter?.imageHash) {
                                enhancedFilter.icon = (
                                    <FieldIcon
                                        hash={tempEnhancedFilter?.imageHash}
                                        title={tempEnhancedFilter?.displayName}
                                    />
                                );
                            }
                            enhancedFilter.content = tempEnhancedFilter?.displayName;
                            enhancedFilter.name = chrome.i18n.getMessage(`attribute_key_${filter.attributeKey}`);
                            enhancedQuickFilters.push(enhancedFilter);
                        } else {
                            enhancedQuickFilters.push({
                                name: chrome.i18n.getMessage(`attribute_key_${filter.attributeKey}`),
                                content: filter.values[0],
                                filter,
                            });
                        }
                        break;
                    }
                    case 'Module': {
                        const tempEnhancedFilter = moduleFields?.find((item) => item.id === value);
                        if (tempEnhancedFilter) {
                            enhancedFilter.icon = tempEnhancedFilter.icon;
                            enhancedFilter.content = tempEnhancedFilter.label;
                            enhancedFilter.name = chrome.i18n.getMessage(`attribute_key_${filter.attributeKey}`);
                            enhancedQuickFilters.push(enhancedFilter);
                        } else {
                            enhancedQuickFilters.push({
                                name: chrome.i18n.getMessage(`attribute_key_${filter.attributeKey}`),
                                content: filter.values[0],
                                filter,
                            });
                        }
                        break;
                    }
                    case 'EntityType': {
                        enhancedFilter.icon = (
                            <DGGlyph
                                icon={entitiesTypeRelatedInfos[value].glyph}
                                kind={entitiesTypeRelatedInfos[value].kind.toLocaleLowerCase()}
                                title={chrome.i18n.getMessage(`entity_label_full_${value}`)}
                            />
                        );
                        enhancedFilter.content = chrome.i18n.getMessage(`entity_label_full_${value}`);
                        enhancedFilter.name = chrome.i18n.getMessage(`attribute_key_${filter.attributeKey}`);
                        enhancedQuickFilters.push(enhancedFilter);

                        break;
                    }
                    case 'Domains': {
                        const tempEnhancedFilter = domains?.find((item) => item.id === value);
                        if (tempEnhancedFilter) {
                            enhancedFilter.icon = (
                                <ColorPoint color={tempEnhancedFilter?.color} title={tempEnhancedFilter?.label} />
                            );
                            enhancedFilter.content = tempEnhancedFilter?.label;
                            enhancedFilter.name = chrome.i18n.getMessage(`attribute_key_${filter.attributeKey}`);
                            enhancedQuickFilters.push(enhancedFilter);
                        } else {
                            enhancedQuickFilters.push({
                                name: chrome.i18n.getMessage(`attribute_key_${filter.attributeKey}`),
                                content: filter.values[0],
                                filter,
                            });
                        }
                        break;
                    }
                    case 'DataOwners': {
                        const tempEnhancedFilter = users?.owners?.find((item) => item.userId === value);
                        if (tempEnhancedFilter) {
                            enhancedFilter.icon = <Avatar size="mini" user={tempEnhancedFilter} />;
                            enhancedFilter.content = `${tempEnhancedFilter.firstName} ${tempEnhancedFilter.lastName}`;
                            enhancedFilter.name = chrome.i18n.getMessage(`attribute_key_${filter.attributeKey}`);
                            enhancedQuickFilters.push(enhancedFilter);
                        } else {
                            enhancedQuickFilters.push({
                                name: chrome.i18n.getMessage(`attribute_key_${filter.attributeKey}`),
                                content: filter.values[0],
                                filter,
                            });
                        }
                        break;
                    }
                    case 'DataStewards': {
                        const tempEnhancedFilter = users?.stewards?.find((item) => item.userId === value);
                        if (tempEnhancedFilter) {
                            enhancedFilter.icon = <Avatar size="mini" user={tempEnhancedFilter} />;
                            enhancedFilter.content = `${tempEnhancedFilter.firstName} ${tempEnhancedFilter.lastName}`;
                            enhancedFilter.name = chrome.i18n.getMessage(`attribute_key_${filter.attributeKey}`);
                            enhancedQuickFilters.push(enhancedFilter);
                        } else {
                            enhancedQuickFilters.push({
                                name: chrome.i18n.getMessage(`attribute_key_${filter.attributeKey}`),
                                content: filter.values[0],
                                filter,
                            });
                        }
                        break;
                    }
                    case 'EntityStatus': {
                        const tempEnhancedFilter = status?.find((item) => item.key === value);
                        if (tempEnhancedFilter) {
                            enhancedFilter.icon = <Status status={tempEnhancedFilter.value} hideLabel />;
                            enhancedFilter.content = chrome.i18n.getMessage(
                                `entity_status_${tempEnhancedFilter.value}`,
                            );
                            enhancedFilter.name = chrome.i18n.getMessage(`attribute_key_${filter.attributeKey}`);
                            enhancedQuickFilters.push(enhancedFilter);
                        } else {
                            enhancedQuickFilters.push({
                                name: chrome.i18n.getMessage(`attribute_key_${filter.attributeKey}`),
                                content: filter.values[0],
                                filter,
                            });
                        }
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
