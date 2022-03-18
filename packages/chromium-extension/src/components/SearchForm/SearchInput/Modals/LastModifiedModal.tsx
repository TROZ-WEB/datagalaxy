import React from 'react';
import { useStoreState, useStoreActions } from '../../../../store/hooks';
import FilterModal from '../FilterModal';

/* ---------- COMPONENT ---------- */

const LastModifiedModal = () => {
    const pickedFilters = useStoreState((state) => state.filters.pickedFilters);
    const { updatePickedFilters } = useStoreActions((actions) => actions.filters);

    const fields = [
        { id: 'pastHour', label: chrome.i18n.getMessage(`last_modified_pastHour`) },
        { id: 'today', label: chrome.i18n.getMessage(`last_modified_today`) },
        { id: 'yesterday', label: chrome.i18n.getMessage(`last_modified_yesterday`) },
        { id: 'currentWeek', label: chrome.i18n.getMessage(`last_modified_currentWeek`) },
        { id: 'pastWeek', label: chrome.i18n.getMessage(`last_modified_pastWeek`) },
        { id: 'beforeCurrentWeek', label: chrome.i18n.getMessage(`last_modified_beforeCurrentWeek`) },
        { id: 'beforePastWeek', label: chrome.i18n.getMessage(`last_modified_beforePastWeek`) },
        { id: 'currentMonth', label: chrome.i18n.getMessage(`last_modified_currentMonth`) },
        { id: 'pastMonth', label: chrome.i18n.getMessage(`last_modified_pastMonth`) },
        { id: 'beforeCurrentMonth', label: chrome.i18n.getMessage(`last_modified_beforeCurrentMonth`) },
        { id: 'beforePastMonth', label: chrome.i18n.getMessage(`last_modified_beforePastMonth`) },
        { id: 'beforeToday', label: chrome.i18n.getMessage(`last_modified_beforeToday`) },
        { id: 'currentYear', label: chrome.i18n.getMessage(`last_modified_currentYear`) },
        { id: 'last365days', label: chrome.i18n.getMessage(`last_modified_last365days`) },
    ];

    const handleChange = (id) => {
        const date = new Date().toString();
        const newPickedFilters = [...pickedFilters];
        const filterIndex = newPickedFilters?.findIndex((item) => item.attributeKey === 'LastModificationTime');
        if (filterIndex === -1) {
            const filter = {
                attributeKey: 'LastModificationTime',
                operator: id,
                values: [date],
            };
            newPickedFilters.push(filter);
        } else {
            newPickedFilters[filterIndex].values = [id];
        }

        updatePickedFilters(newPickedFilters);
    };

    return (
        <FilterModal
            fields={fields}
            label={chrome.i18n.getMessage(`attribute_key_LastModified`)}
            onChange={handleChange}
        />
    );
};

export default LastModifiedModal;
