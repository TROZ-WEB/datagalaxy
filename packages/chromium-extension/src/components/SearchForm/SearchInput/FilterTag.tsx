import React from 'react';
import styled from 'styled-components';
import { useStoreState, useStoreActions } from '../../../store/hooks';
import RoundButton from '../../ui/RoundButton';

/* ---------- STYLES ---------- */

const SImageContainer = styled.div`
    margin-right: 5px;
    align-items: center;
    display: flex;
`;

const SRoot = styled.div`
    background: #ffffff;
    height: 26px;
    padding: 4px 8px;
    max-width: 110px;
    border: none;
    border-radius: 3px;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: space-between;
    color: #001030;
    box-sizing: border-box;
    margin: 4px;
    box-shadow: 0px 0px 8px rgba(16, 53, 177, 0.14);
`;

const SRoundButton = styled(RoundButton)`
    margin-left: 2px;
`;

const STextContainer = styled.div`
    overflow: hidden;
    display: flex;
`;

const SOperator = styled.div`
    padding-right: 2px;
    padding-left: 2px;
    border-radius: 3px;
    background-color: #5a5e86;
    color: #fff;
    font-size: 8px;
    line-height: 12px;
    height: 12px;
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
`;

/* ---------- COMPONENT ---------- */

interface Props {
    filter: any;
    onClick: () => void;
}

const FilterTag = React.forwardRef(({ filter, onClick }: Props, ref) => {
    const pickedFilters = useStoreState((state) => state.filters.pickedFilters);
    const { updatePickedFilters } = useStoreActions((actions) => actions.filters);
    const { updateVersionId } = useStoreActions((actions) => actions.filters);

    const handleDeleteFilter = (e) => {
        e.stopPropagation();
        if (filter?.filter?.attributeKey === 'Workspace') {
            updateVersionId(null);
        }
        const payload = pickedFilters.filter((item) => item?.filter?.attributeKey !== filter?.filter?.attributeKey);
        updatePickedFilters(payload);
    };

    return (
        <SRoot
            ref={ref}
            onClick={onClick}
            title={`${chrome.i18n.getMessage(`attribute_key_${filter?.filter?.attributeKey}`)} : ${filter?.label?.join(
                ', ',
            )}`}
        >
            <SImageContainer>{filter?.icon?.map((icon) => icon)}</SImageContainer>
            <STextContainer>
                <SValue>{filter?.label?.map((label) => label)}</SValue>
                {filter?.label?.length > 1 && (
                    <SOperator>
                        {filter?.filter?.operator === 'contains'
                            ? chrome.i18n.getMessage(`operator_or`)
                            : chrome.i18n.getMessage(`operator_and`)}
                    </SOperator>
                )}
            </STextContainer>
            <SRoundButton icon="Cancelsearch" onClick={(e) => handleDeleteFilter(e)} size="XS" />
        </SRoot>
    );
});

export default FilterTag;
