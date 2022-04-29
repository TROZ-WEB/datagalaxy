import React, { FC } from 'react';
import { AttributeKey, PickedFilter } from 'shared';
import { useStoreState, useStoreActions } from '../../../../store/hooks';
import ModalBase, { Field } from '../ModalBase';

/* ---------- COMPONENT ---------- */

const LastModifiedModal: FC = () => {
    const pickedFilters = useStoreState((state) => state.filters.pickedFilters);
    const { updatePickedFilters } = useStoreActions((actions) => actions.filters);
    const { LastModificationTime } = useStoreState((state) => state.modal);

    const index = pickedFilters?.findIndex((item) => item?.filter?.attributeKey === AttributeKey.LAST_MODIFICATION);

    const fields: Field[] = [
        {
            id: 'pastHour',
            label: chrome.i18n.getMessage(`last_modified_pastHour`),
            checked: Boolean(pickedFilters?.[index]?.filter?.values?.includes('pastHour')),
        },
        {
            id: 'today',
            label: chrome.i18n.getMessage(`last_modified_today`),
            checked: Boolean(pickedFilters?.[index]?.filter?.values?.includes('today')),
        },
        {
            id: 'yesterday',
            label: chrome.i18n.getMessage(`last_modified_yesterday`),
            checked: Boolean(pickedFilters?.[index]?.filter?.values?.includes('yesterday')),
        },
        {
            id: 'currentWeek',
            label: chrome.i18n.getMessage(`last_modified_currentWeek`),
            checked: Boolean(pickedFilters?.[index]?.filter?.values?.includes('currentWeek')),
        },
        {
            id: 'pastWeek',
            label: chrome.i18n.getMessage(`last_modified_pastWeek`),
            checked: Boolean(pickedFilters?.[index]?.filter?.values?.includes('pastWeek')),
        },
        {
            id: 'beforeCurrentWeek',
            label: chrome.i18n.getMessage(`last_modified_beforeCurrentWeek`),
            checked: Boolean(pickedFilters?.[index]?.filter?.values?.includes('beforeCurrentWeek')),
        },
        {
            id: 'beforePastWeek',
            label: chrome.i18n.getMessage(`last_modified_beforePastWeek`),
            checked: Boolean(pickedFilters?.[index]?.filter?.values?.includes('beforePastWeek')),
        },
        {
            id: 'currentMonth',
            label: chrome.i18n.getMessage(`last_modified_currentMonth`),
            checked: Boolean(pickedFilters?.[index]?.filter?.values?.includes('currentMonth')),
        },
        {
            id: 'pastMonth',
            label: chrome.i18n.getMessage(`last_modified_pastMonth`),
            checked: Boolean(pickedFilters?.[index]?.filter?.values?.includes('pastMonth')),
        },
        {
            id: 'beforeCurrentMonth',
            label: chrome.i18n.getMessage(`last_modified_beforeCurrentMonth`),
            checked: Boolean(pickedFilters?.[index]?.filter?.values?.includes('beforeCurrentMonth')),
        },
        {
            id: 'beforePastMonth',
            label: chrome.i18n.getMessage(`last_modified_beforePastMonth`),
            checked: Boolean(pickedFilters?.[index]?.filter?.values?.includes('beforePastMonth')),
        },
        {
            id: 'beforeToday',
            label: chrome.i18n.getMessage(`last_modified_beforeToday`),
            checked: Boolean(pickedFilters?.[index]?.filter?.values?.includes('beforeToday')),
        },
        {
            id: 'currentYear',
            label: chrome.i18n.getMessage(`last_modified_currentYear`),
            checked: Boolean(pickedFilters?.[index]?.filter?.values?.includes('currentYear')),
        },
        {
            id: 'last365days',
            label: chrome.i18n.getMessage(`last_modified_last365days`),
            checked: Boolean(pickedFilters?.[index]?.filter?.values?.includes('last365days')),
        },
    ];

    const handleChange = (field) => {
        const newPickedFilters = [...pickedFilters];
        const filterIndex = newPickedFilters?.findIndex(
            (item) => item?.filter?.attributeKey === AttributeKey.LAST_MODIFICATION,
        );
        if (filterIndex !== -1) {
            newPickedFilters.splice(filterIndex, 1);
        }

        const name = chrome.i18n.getMessage(`attribute_key_LastModificationTime`);
        const filter: PickedFilter = {
            icon: null,
            content: [field.label],
            name,
            nameUnit: name,
            filter: { attributeKey: AttributeKey.LAST_MODIFICATION, operator: field.id, values: [field.id] },
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
