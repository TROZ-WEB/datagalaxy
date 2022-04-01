import React, { FC } from 'react';
import { useStoreState, useStoreActions } from '../../../../store/hooks';
import ModalBase from '../ModalBase';

/* ---------- COMPONENT ---------- */

const LastModifiedModal: FC = () => {
    const pickedFilters = useStoreState((state) => state.filters.pickedFilters);
    const { updatePickedFilters } = useStoreActions((actions) => actions.filters);
    const { LastModificationTime } = useStoreState((state) => state.modal);

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

    const handleChange = (field) => {
        const date = new Date().toString();
        const newPickedFilters = [...pickedFilters];
        const filterIndex = newPickedFilters?.findIndex(
            (item) => item?.filter?.attributeKey === 'LastModificationTime',
        );
        if (filterIndex !== -1) {
            newPickedFilters.splice(filterIndex, 1);
        }

        const filter = {
            icon: null,
            content: [field.label],
            name: chrome.i18n.getMessage(`attribute_key_LastModificationTime`),
            filter: { attributeKey: 'LastModificationTime', operator: field.id, values: [date] },
        };
        newPickedFilters.push(filter);

        updatePickedFilters(newPickedFilters);
    };

    return (
        <ModalBase
            attributeKey="LastModificationTime"
            fields={fields}
            handleChange={handleChange}
            isOpen={LastModificationTime}
        />
    );
};

export default LastModifiedModal;
