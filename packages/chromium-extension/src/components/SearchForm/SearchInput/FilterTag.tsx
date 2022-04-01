import React from 'react';
import styled from 'styled-components';
import { useStoreState, useStoreActions } from '../../../store/hooks';
import RoundButton from '../../ui/RoundButton';

/* ---------- STYLES ---------- */

const SEllipse = styled.span`
    color: #1035b1;
    font-size: 10px;
    margin: 0px 2px;
    background: #f3f6ff;
    padding: 2px;
    border-radius: 3px;
    font-weight: bold;
    width: 16px;
`;

const SImageContainer = styled.div`
    align-items: center;
    display: flex;
`;

const SRoot = styled.div`
    background: #ffffff;
    height: 26px;
    padding: 4px 8px;
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
            <SImageContainer>{filter?.icon?.slice(0, 2)?.map((icon) => icon)}</SImageContainer>
            {filter?.label?.length > 2 && <SEllipse>{`+ ${filter?.icon.length - 2}`}</SEllipse>}
            <STextContainer>
                {filter?.label?.length === 1 && <SValue>{filter?.label?.map((label) => label)}</SValue>}
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
