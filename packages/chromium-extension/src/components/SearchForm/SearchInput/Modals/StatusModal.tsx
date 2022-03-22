import React, { useEffect, useState, FC } from 'react';
import { useStoreState, useStoreDispatch, useStoreActions } from '../../../../store/hooks';
import Status from '../../../Entity/Status';
import ModalBase from '../ModalBase';

/* ---------- COMPONENT ---------- */

const StatusModal: FC = () => {
    const dispatch = useStoreDispatch();
    const status = useStoreState((state) => state.filters.status);
    const pickedFilters = useStoreState((state) => state.filters.pickedFilters);
    const { updatePickedFilters } = useStoreActions((actions) => actions.filters);
    const [intersectionLogic, setIntersectionLogic] = useState('or');
    const [statusFields, setStatusFields] = useState([]);
    const { EntityStatus } = useStoreState((state) => state.modal);

    useEffect(() => {
        const fetchStatusAPI = async () => {
            await dispatch.filters.fetchStatus(null);
        };

        fetchStatusAPI();
    }, [dispatch]);

    useEffect(() => {
        const index = pickedFilters?.findIndex((item) => item?.filter?.attributeKey === 'EntityStatus');
        const formatedStatusFields = status?.map((item) => {
            return {
                id: item.key,
                label: chrome.i18n.getMessage(`entity_status_${item.value}`),
                icon: <Status status={item.value} hideLabel />,
                checked: !!pickedFilters?.[index]?.filter?.values?.includes(item.key),
            };
        });
        setStatusFields(formatedStatusFields);
    }, [status, pickedFilters]);

    const handleChange = (id) => {
        const newPickedFilters = [...pickedFilters];
        const filterIndex = newPickedFilters?.findIndex((item) => item?.filter?.attributeKey === 'EntityStatus');
        const newOperator = intersectionLogic === 'or' ? 'contains' : 'matchAll';
        if (filterIndex === -1) {
            const filter = {
                icon: statusFields.find((item) => item.id === id).icon,
                filter: { attributeKey: 'EntityStatus', operator: newOperator, values: [id] },
            };
            newPickedFilters.push(filter);
        } else {
            const { values } = newPickedFilters[filterIndex].filter;
            newPickedFilters[filterIndex].filter.operator = newOperator;
            const idIndex = values?.findIndex((item) => item === id);

            if (idIndex === -1) {
                values.push(id);
            } else {
                values.splice(idIndex, 1);
            }

            if (values.length === 0) {
                newPickedFilters.splice(filterIndex, 1);
            } else if (values.length > 1) {
                newPickedFilters[filterIndex].icon = null;
            }
        }

        updatePickedFilters(newPickedFilters);
    };

    const handleChangeIntersectionLogic = (params) => {
        setIntersectionLogic(params);
        const newPickedFilters = [...pickedFilters];
        const filterIndex = newPickedFilters?.findIndex((item) => item?.filter?.attributeKey === 'EntityStatus');
        const newOperator = params === 'or' ? 'contains' : 'matchAll';
        if (filterIndex !== -1) {
            newPickedFilters[filterIndex].filter.operator = newOperator;
        }

        updatePickedFilters(newPickedFilters);
    };

    return (
        <ModalBase
            fields={statusFields}
            handleChangeIntersectionLogic={handleChangeIntersectionLogic}
            intersectionLogic={intersectionLogic}
            isOpen={EntityStatus}
            label={chrome.i18n.getMessage(`attribute_key_EntityStatus`)}
            onChange={handleChange}
            multiselect
        />
    );
};

export default StatusModal;
