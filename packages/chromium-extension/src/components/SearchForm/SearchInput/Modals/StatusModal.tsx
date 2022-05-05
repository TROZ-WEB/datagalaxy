import React, { useEffect, useState, FC } from 'react';
import { AttributeKey } from 'shared';
import { useStoreState, useStoreDispatch } from '../../../../store/hooks';
import Status from '../../../Entity/Status';
import ModalBase from '../ModalBase';
import { useSortArray } from './utils';

/* ---------- COMPONENT ---------- */

const StatusModal: FC = () => {
    const dispatch = useStoreDispatch();
    const status = useStoreState((state) => state.filters.status);
    const pickedFilters = useStoreState((state) => state.filters.pickedFilters);
    const [operator, setOperator] = useState('or');
    const [statusFields, setStatusFields] = useState([]);
    const { EntityStatus } = useStoreState((state) => state.modal);
    const { sortArray } = useSortArray();

    useEffect(() => {
        const fetchStatusAPI = async () => {
            await dispatch.filters.fetchStatus(null);
        };

        fetchStatusAPI();
    }, [dispatch]);

    useEffect(() => {
        const index = pickedFilters?.findIndex((item) => item?.filter?.attributeKey === AttributeKey.ENTITY_STATUS);
        const formatedStatusFields = status?.map((item) => {
            const name = chrome.i18n.getMessage(`attribute_key_EntityStatus`);

            return {
                id: item.key,
                label: chrome.i18n.getMessage(`entity_status_${item.value}`),
                icon: <Status showTooltip={false} status={item.value} hideLabel />,
                checked: Boolean(pickedFilters?.[index]?.filter?.values?.includes(item.key)),
                name,
                nameUnit: name,
            };
        });
        setStatusFields(formatedStatusFields);
    }, [status, pickedFilters]);

    sortArray(statusFields);

    return (
        <ModalBase
            attributeKey="EntityStatus"
            fields={statusFields}
            isOpen={EntityStatus}
            operator={operator}
            setOperator={setOperator}
            multiselect
        />
    );
};

export default StatusModal;
