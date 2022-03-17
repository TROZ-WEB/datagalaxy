import React, { useEffect, useState } from 'react';
import { useStoreState, useStoreDispatch, useStoreActions } from '../../../../store/hooks';
import FilterModal from '../FilterModal';

/* ---------- COMPONENT ---------- */

const StatusModal = () => {
    const dispatch = useStoreDispatch();
    const status = useStoreState((state) => state.filters.status);
    const pickedFilters = useStoreState((state) => state.filters.pickedFilters);
    const { updatePickedFilters } = useStoreActions((actions) => actions.filters);
    const [intersectionLogic, setIntersectionLogic] = useState('or');
    const [statusFields, setStatusFields] = useState([]);

    useEffect(() => {
        const fetchStatusAPI = async () => {
            await dispatch.filters.fetchStatus(null);
        };

        fetchStatusAPI();
    }, [dispatch]);

    useEffect(() => {
        const index = pickedFilters?.findIndex((item) => item.attributeKey === 'Status');
        const formatedStatusFields = status?.map((item) => {
            return {
                id: item.key,
                label: item.value,
                checked: !!pickedFilters?.[index]?.values?.includes(item.key),
            };
        });
        setStatusFields(formatedStatusFields);
    }, [status, pickedFilters]);

    const handleChange = (id) => {
        const newPickedFilters = [...pickedFilters];
        const filterIndex = newPickedFilters?.findIndex((item) => item.attributeKey === 'Status');
        const newOperator = intersectionLogic === 'or' ? 'contains' : 'matchAll';
        if (filterIndex === -1) {
            const filter = {
                attributeKey: 'Status',
                operator: newOperator,
                values: [id],
            };
            newPickedFilters.push(filter);
        } else {
            const { values } = newPickedFilters[filterIndex];
            newPickedFilters[filterIndex].operator = newOperator;
            const idIndex = values?.findIndex((item) => item === id);

            if (idIndex === -1) {
                values.push(id);
            } else {
                values.splice(idIndex, 1);
            }
        }

        updatePickedFilters(newPickedFilters);
    };

    const handleChangeIntersectionLogic = (params) => {
        setIntersectionLogic(params);
        const newPickedFilters = [...pickedFilters];
        const filterIndex = newPickedFilters?.findIndex((item) => item.attributeKey === 'Status');
        const newOperator = params === 'or' ? 'contains' : 'matchAll';
        if (filterIndex !== -1) {
            newPickedFilters[filterIndex].operator = newOperator;
        }

        updatePickedFilters(newPickedFilters);
    };

    return (
        <FilterModal
            fields={statusFields}
            handleChangeIntersectionLogic={handleChangeIntersectionLogic}
            intersectionLogic={intersectionLogic}
            label={chrome.i18n.getMessage(`attribute_key_EntityStatus`)}
            onChange={handleChange}
            multiselect
        />
    );
};

export default StatusModal;
