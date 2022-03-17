import React, { useEffect, useState } from 'react';
import { useStoreState, useStoreDispatch, useStoreActions } from '../../../../store/hooks';
import ColorPoint from '../../../ui/ColorPoint';
import FilterModal from '../FilterModal';

/* ---------- COMPONENT ---------- */

const DomainsModal = () => {
    const dispatch = useStoreDispatch();
    const domains = useStoreState((state) => state.filters.domains);
    const pickedFilters = useStoreState((state) => state.filters.pickedFilters);
    const { updatePickedFilters } = useStoreActions((actions) => actions.filters);
    const [intersectionLogic, setIntersectionLogic] = useState('or');
    const [domainsFields, setDomainsFields] = useState([]);

    useEffect(() => {
        const fetchDomainsAPI = async () => {
            await dispatch.filters.fetchDomains(null);
        };

        fetchDomainsAPI();
    }, [dispatch]);

    useEffect(() => {
        const index = pickedFilters?.findIndex((item) => item.attributeKey === 'Domains');
        const formatedDomainsFields = domains?.map((item) => {
            return {
                id: item.id,
                label: item.label,
                icon: <ColorPoint color={item.color} />,
                checked: !!pickedFilters?.[index]?.values?.includes(item.id),
            };
        });
        setDomainsFields(formatedDomainsFields);
    }, [domains, pickedFilters]);

    const handleChange = (id) => {
        const newPickedFilters = [...pickedFilters];
        const filterIndex = newPickedFilters?.findIndex((item) => item.attributeKey === 'Domains');
        const newOperator = intersectionLogic === 'or' ? 'contains' : 'matchAll';
        if (filterIndex === -1) {
            const filter = {
                attributeKey: 'Domains',
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
        const filterIndex = newPickedFilters?.findIndex((item) => item.attributeKey === 'Domains');
        const newOperator = params === 'or' ? 'contains' : 'matchAll';
        if (filterIndex !== -1) {
            newPickedFilters[filterIndex].operator = newOperator;
        }

        updatePickedFilters(newPickedFilters);
    };

    return (
        <FilterModal
            fields={domainsFields}
            handleChangeIntersectionLogic={handleChangeIntersectionLogic}
            intersectionLogic={intersectionLogic}
            label={chrome.i18n.getMessage(`attribute_key_Domains`)}
            onChange={handleChange}
            multiselect
        />
    );
};

export default DomainsModal;
