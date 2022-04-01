import React, { FC, useState, useRef } from 'react';
import { EnhancedFilter, entitiesTypeRelatedInfos, PickedFilters, SearchResponse } from 'shared';
import styled from 'styled-components';
import { useStoreState, useStoreActions } from '../../../store/hooks';
import Avatar from '../../Avatar/index';
import Status from '../../Entity/Status';
import ColorPoint from '../../ui/ColorPoint';
import DGGlyph from '../../ui/DGGlyph';
import Glyph from '../../ui/Glyph';
import FieldIcon from '../SearchInput/Modals/FieldIcon';
import { moduleFields } from '../SearchInput/Modals/utils';
import QuickFilter from './QuickFilter';

/* ---------- STYLES ---------- */

const SScrollButton = styled.button`
    height: 22px;
    width: 22px;
    border-radius: 22px;
    background-color: #1035b1;
    border: none;
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    color: #ffffff;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: all 0.2s;
    cursor: pointer;

    &:disabled {
        opacity: 0 !important;
    }
`;

const SLeftButton = styled(SScrollButton)`
    left: 0;
    top: 50%;
    transform: translate(-50%, -50%);
`;

const SRightButton = styled(SScrollButton)`
    right: 0;
    top: 50%;
    transform: translate(50%, -50%);
`;

const SGlyph = styled(Glyph)`
    transform: rotate(180deg);
`;

const SQuickFiltersContainer = styled.div`
    display: flex;
`;

const SRoot = styled.div`
    margin-top: 16px;
    position: relative;
    background-color: #f3f6ff;
`;

const SText = styled.p`
    font-size: 10px;
    height: 58px;
    padding: 0px 12px;
    display: flex;
    align-items: center;
    justify-content: center;
    text-align: center;
    font-weight: 700;
    color: #989cd9;
    margin: 0;
`;

const SScrollContainer = styled.div`
    overflow-x: scroll;
    scroll-behavior: smooth;
    display: flex;
    padding: 12px;
    padding-left: 8px;
    padding-right: 8px;

    &::-webkit-scrollbar-track {
        display: none;
    }

    &::-webkit-scrollbar-thumb {
        display: none;
    }

    &::-webkit-scrollbar-thumb:hover {
        display: none;
    }

    &::-webkit-scrollbar {
        display: none;
    }

    ${SScrollButton} {
        opacity: 0;
    }

    &:hover,
    &:focus {
        ${SScrollButton} {
            opacity: 1;
        }
    }
`;

/* ---------- COMPONENT ---------- */

interface Props {
    quickFilters: SearchResponse;
    search: string;
    pickedFilters: PickedFilters[];
}

const QuickFiltersBar: FC<Props> = ({ quickFilters, search }) => {
    const QuickFiltersArray = quickFilters?.quickFilters?.filter(
        (f) => !f?.filter?.attributeKey.includes('ObjectLinks'),
    );
    const { technologies, domains, users, status, workspaces } = useStoreState((state) => state.filters);

    const [scrollValue, setScrollValue] = useState(0);
    const shadowRoot = document.getElementById('datagalaxy_shadow_root');
    const scrollContainer = shadowRoot.shadowRoot.getElementById('quickFilters');
    const maxScroll = scrollContainer?.scrollWidth - scrollContainer?.clientWidth;

    const handleScroll = () => {
        setScrollValue(scrollContainer.scrollLeft);
    };

    const handleScrollLeft = () => {
        scrollContainer.scrollLeft -= 348;
    };

    const handleScrollRight = () => {
        scrollContainer.scrollLeft += 348;
    };

    const { pickedFilters } = useStoreState((state) => state.filters);
    const { updatePickedFilters } = useStoreActions((actions) => actions.filters);

    const { updateModalState, updateModalTop } = useStoreActions((actions) => actions.modal);

    const filtersModal = useRef(null);
    const modalTop = filtersModal?.current?.getBoundingClientRect()?.bottom;

    const handleAddFilter = (f) => {
        if (f?.filter?.values?.length === 1) {
            // Closed filter
            const newPickedFilters = [...pickedFilters];
            const filterIndex = newPickedFilters?.findIndex(
                (item) => item?.filter?.attributeKey === f?.filter?.attributeKey,
            );
            if (filterIndex === -1) {
                const filter = {
                    icon: [f.icon],
                    label: [f.label],
                    filter: f.filter,
                };
                newPickedFilters.push(filter);
            } else {
                const { icon, label, filter } = newPickedFilters[filterIndex];
                filter.values.push(f.id);
                icon.push(f.icon);
                label.push(f.label);
            }

            updatePickedFilters(newPickedFilters);
        } else {
            // Open filter
            updateModalTop(modalTop);
            updateModalState({ modal: 'Overlay', isOpen: true });
            updateModalState({ modal: f?.filter?.attributeKey, isOpen: true });
        }
    };

    const enhancedQuickFilters = [];

    QuickFiltersArray?.forEach(({ filter }) => {
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
                        enhancedFilter.label = tempEnhancedFilter?.name;
                        enhancedQuickFilters.push(enhancedFilter);
                    } else {
                        enhancedQuickFilters.push({ label: filter.values[0], filter });
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
                        enhancedFilter.label = tempEnhancedFilter?.displayName;
                        enhancedQuickFilters.push(enhancedFilter);
                    } else {
                        enhancedQuickFilters.push({ label: filter.values[0], filter });
                    }
                    break;
                }
                case 'Module': {
                    const tempEnhancedFilter = moduleFields?.find((item) => item.id === value);
                    if (tempEnhancedFilter) {
                        enhancedFilter.icon = tempEnhancedFilter.icon;
                        enhancedFilter.label = tempEnhancedFilter.label;
                        enhancedQuickFilters.push(enhancedFilter);
                    } else {
                        enhancedQuickFilters.push({ label: filter.values[0], filter });
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
                    enhancedFilter.label = chrome.i18n.getMessage(`entity_label_full_${value}`);

                    enhancedQuickFilters.push(enhancedFilter);

                    break;
                }
                case 'Domains': {
                    const tempEnhancedFilter = domains?.find((item) => item.id === value);
                    if (tempEnhancedFilter) {
                        enhancedFilter.icon = (
                            <ColorPoint color={tempEnhancedFilter?.color} title={tempEnhancedFilter?.label} />
                        );
                        enhancedFilter.label = tempEnhancedFilter?.label;
                        enhancedQuickFilters.push(enhancedFilter);
                    } else {
                        enhancedQuickFilters.push({ label: filter.values[0], filter });
                    }
                    break;
                }
                case 'DataOwners': {
                    const tempEnhancedFilter = users?.owners?.find((item) => item.userId === value);
                    if (tempEnhancedFilter) {
                        enhancedFilter.icon = <Avatar size="mini" user={tempEnhancedFilter} />;
                        enhancedFilter.label = `${tempEnhancedFilter.firstName} ${tempEnhancedFilter.lastName}`;
                        enhancedQuickFilters.push(enhancedFilter);
                    } else {
                        enhancedQuickFilters.push({ label: filter.values[0], filter });
                    }
                    break;
                }
                case 'DataStewards': {
                    const tempEnhancedFilter = users?.stewards?.find((item) => item.userId === value);
                    if (tempEnhancedFilter) {
                        enhancedFilter.icon = <Avatar size="mini" user={tempEnhancedFilter} />;
                        enhancedFilter.label = `${tempEnhancedFilter.firstName} ${tempEnhancedFilter.lastName}`;
                        enhancedQuickFilters.push(enhancedFilter);
                    } else {
                        enhancedQuickFilters.push({ label: filter.values[0], filter });
                    }
                    break;
                }
                case 'EntityStatus': {
                    const tempEnhancedFilter = status?.find((item) => item.key === value);
                    if (tempEnhancedFilter) {
                        enhancedFilter.icon = <Status status={tempEnhancedFilter.value} hideLabel />;
                        enhancedFilter.label = chrome.i18n.getMessage(`entity_status_${tempEnhancedFilter.value}`);
                        enhancedQuickFilters.push(enhancedFilter);
                    } else {
                        enhancedQuickFilters.push({ label: filter.values[0], filter });
                    }
                    break;
                }
                default:
                    enhancedQuickFilters.push({ label: filter.values[0], filter });
            }
        } else {
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
            if (supportedAttributeKeys.includes(filter.attributeKey)) enhancedQuickFilters.push({ filter });
        }
    });

    const enhancedQuickFiltersArray = enhancedQuickFilters?.slice(0, 12);

    return (
        // eslint-disable-next-line react/jsx-no-useless-fragment
        <>
            {(pickedFilters?.length > 0 || search?.length > 0 || enhancedQuickFiltersArray?.length > 0) && (
                <SRoot>
                    {enhancedQuickFiltersArray?.length > 0 ? (
                        <SScrollContainer id="quickFilters" onScroll={handleScroll}>
                            <SLeftButton disabled={scrollValue === 0} onClick={handleScrollLeft}>
                                <SGlyph icon="ArrowDropRight" />
                            </SLeftButton>
                            <SQuickFiltersContainer>
                                {enhancedQuickFiltersArray?.map((filter, i) => (
                                    <QuickFilter
                                        // eslint-disable-next-line react/no-array-index-key
                                        key={i}
                                        ref={filtersModal}
                                        filter={filter}
                                        onClick={() => handleAddFilter(filter)}
                                    />
                                ))}
                            </SQuickFiltersContainer>
                            <SRightButton disabled={scrollValue === maxScroll} onClick={handleScrollRight}>
                                <Glyph icon="ArrowDropRight" />
                            </SRightButton>
                        </SScrollContainer>
                    ) : (
                        <SText>{chrome.i18n.getMessage(`no_quick_filters`)}</SText>
                    )}
                </SRoot>
            )}
        </>
    );
};

export default QuickFiltersBar;
