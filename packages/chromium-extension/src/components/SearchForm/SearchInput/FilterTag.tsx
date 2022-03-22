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
    height: 34px;
    padding: 4px 8px;
    max-width: 95px;
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
        if (filter?.filter?.value === 'Version') {
            updateVersionId(null);
        } else {
            const payload = pickedFilters.filter((item) => item?.filter?.attributeKey !== filter?.filter?.attributeKey);
            updatePickedFilters(payload);
        }
    };

    return (
        <SRoot ref={ref} onClick={onClick}>
            <SImageContainer>{filter?.icon?.$$typeof && filter?.icon}</SImageContainer>
            <STextContainer>
                <SValue>{chrome.i18n.getMessage(`attribute_key_${filter?.filter?.attributeKey}`)}</SValue>
            </STextContainer>
            <SRoundButton icon="Cancelsearch" onClick={(e) => handleDeleteFilter(e)} size="XS" />
        </SRoot>
    );
});

export default FilterTag;
