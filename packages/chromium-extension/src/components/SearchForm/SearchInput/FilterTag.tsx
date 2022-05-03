import { nanoid } from 'nanoid';
import React, { ReactNode, useMemo } from 'react';
import { PickedFilter } from 'shared';
import styled from 'styled-components';
import { useStoreState, useStoreActions } from '../../../store/hooks';
import RoundButton from '../../ui/RoundButton';
import { closeTooltips } from '../../ui/Tooltip';
import TooltipInformations from '../../ui/TooltipInformations';

/* ---------- STYLES ---------- */

const SEllipse = styled.span`
    color: #1035b1;
    font-size: 8px;
    margin-left: 3px;
    background: #f3f6ff;
    padding: 2px;
    border-radius: 3px;
    font-weight: bold;
    min-width: 16px;
    text-align: center;
`;

const SImageContainer = styled.div`
    align-items: center;
    display: flex;
    & > *:not(:last-child) {
        margin-right: 3px;
    }
`;

const SRoot = styled.div`
    background: #ffffff;
    height: 26px;
    padding: 4px 8px;
    border: none;
    border-radius: 3px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    color: #001030;
    box-sizing: border-box;
    margin: 4px;
    box-shadow: 0px 0px 8px rgba(16, 53, 177, 0.14);
    ${(props) => !props.displayMode && `cursor: pointer;`}
`;

const SRoundButton = styled(RoundButton)`
    margin-left: 2px;
    color: #9b9db6;
`;

const STextContainer = styled.div`
    overflow: hidden;
    display: flex;
`;

const SOperator = styled.span`
    padding-right: 2px;
    padding-left: 2px;
    border-radius: 3px;
    background-color: #5a5e86;
    color: #fff;
    font-size: 8px;
    line-height: 12px;
    font-weight: 700;
    margin-left: 3px;
    margin-right: 3px;
    text-transform: uppercase;
    display: inline;
`;

const SValue = styled.div`
    font-size: 11px;
    white-space: nowrap;
    max-width: 200px;
    overflow: hidden;
    text-overflow: ellipsis;
    margin-left: 5px;
`;

/* ---------- COMPONENT ---------- */

interface Props {
    filter: PickedFilter;
    onClick?: () => void;
    displayMode?: boolean;
}

const FilterTag = React.forwardRef(({ filter, onClick, displayMode = false }: Props, ref) => {
    const pickedFilters = useStoreState((state) => state.filters.pickedFilters);
    const { updatePickedFilters } = useStoreActions((actions) => actions.filters);
    const { updateVersionId } = useStoreActions((actions) => actions.filters);

    const tooltipIds = useMemo(
        () => ({
            root: nanoid(),
            icon: nanoid(),
            ellipsis: nanoid(),
        }),
        [],
    );

    const handleClick = () => {
        if (!displayMode) {
            onClick();
        }
    };

    const handleDeleteFilter = (e: Event) => {
        closeTooltips();
        e.stopPropagation();
        if (filter?.filter?.attributeKey === 'Workspace') {
            updateVersionId(null);
        }
        const payload = pickedFilters.filter((item) => item?.filter?.attributeKey !== filter?.filter?.attributeKey);
        updatePickedFilters(payload);
    };

    return (
        <>
            <SRoot ref={ref} data-for={tooltipIds.root} displayMode={displayMode} onClick={handleClick} data-tip>
                <SImageContainer>
                    {filter?.icon?.slice(0, 2)?.map((icon: ReactNode, index: number) => (
                        // eslint-disable-next-line react/no-array-index-key
                        <React.Fragment key={`${tooltipIds.icon}-${index}`}>
                            <div
                                data-for={`${tooltipIds.icon}-${index}`}
                                data-tip={filter?.content?.length > 1 ? true : undefined}
                            >
                                {icon}
                            </div>
                            {filter?.content?.length > 1 && (
                                <TooltipInformations
                                    header={filter.nameUnit}
                                    id={`${tooltipIds.icon}-${index}`}
                                    informations={filter.content[index]}
                                />
                            )}
                        </React.Fragment>
                    ))}
                </SImageContainer>
                {filter?.content?.length > 2 && (
                    <>
                        <SEllipse data-for={tooltipIds.ellipsis} data-tip>{`+ ${filter?.icon.length - 2}`}</SEllipse>
                        <TooltipInformations
                            header={filter?.name}
                            id={tooltipIds.ellipsis}
                            informations={filter?.content?.join(', ')}
                        />
                    </>
                )}
                <STextContainer>
                    {filter?.content?.length === 1 && <SValue>{filter?.content?.map((content) => content)}</SValue>}
                    {filter?.content?.length > 1 && (
                        <SOperator>
                            {filter?.filter?.operator === 'contains'
                                ? chrome.i18n.getMessage(`operator_or`)
                                : chrome.i18n.getMessage(`operator_and`)}
                        </SOperator>
                    )}
                </STextContainer>
                {!displayMode && <SRoundButton icon="Cancelsearch" onClick={handleDeleteFilter} size="XS" />}
            </SRoot>
            {filter?.content?.length === 1 && (
                <TooltipInformations header={filter?.nameUnit} id={tooltipIds.root} informations={filter?.content[0]} />
            )}
        </>
    );
});

export default FilterTag;
