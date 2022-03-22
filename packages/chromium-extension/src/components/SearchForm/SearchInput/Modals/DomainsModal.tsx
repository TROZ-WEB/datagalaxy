import React, { useEffect, useState, FC } from 'react';
import { useStoreState, useStoreDispatch, useStoreActions } from '../../../../store/hooks';
import ColorPoint from '../../../ui/ColorPoint';
import ModalBase from '../ModalBase';

/* ---------- COMPONENT ---------- */

const DomainsModal: FC = () => {
    const dispatch = useStoreDispatch();
    const domains = useStoreState((state) => state.filters.domains);
    const pickedFilters = useStoreState((state) => state.filters.pickedFilters);
    const { updatePickedFilters } = useStoreActions((actions) => actions.filters);
    const { Domains } = useStoreState((state) => state.modal);
    const [intersectionLogic, setIntersectionLogic] = useState('or');
    const [domainsFields, setDomainsFields] = useState([]);

    useEffect(() => {
        const fetchDomainsAPI = async () => {
            await dispatch.filters.fetchDomains(null);
        };

        fetchDomainsAPI();
    }, [dispatch]);

    useEffect(() => {
        const index = pickedFilters?.findIndex((item) => item?.filter?.attributeKey === 'Domains');
        const formatedDomainsFields = domains?.map((item) => {
            return {
                id: item.id,
                label: item.label,
                icon: <ColorPoint color={item.color} />,
                checked: !!pickedFilters?.[index]?.filter?.values?.includes(item.id),
            };
        });
        setDomainsFields(formatedDomainsFields);
    }, [domains, pickedFilters]);

    const handleChange = (id) => {
        const newPickedFilters = [...pickedFilters];
        const filterIndex = newPickedFilters?.findIndex((item) => item?.filter?.attributeKey === 'Domains');
        const newOperator = intersectionLogic === 'or' ? 'contains' : 'matchAll';
        if (filterIndex === -1) {
            const filter = {
                icon: domainsFields.find((item) => item.id === id).icon,
                filter: { attributeKey: 'Domains', operator: newOperator, values: [id] },
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
        const filterIndex = newPickedFilters?.findIndex((item) => item?.filter?.attributeKey === 'Domains');
        const newOperator = params === 'or' ? 'contains' : 'matchAll';
        if (filterIndex !== -1) {
            newPickedFilters[filterIndex].filter.operator = newOperator;
        }

        updatePickedFilters(newPickedFilters);
    };

    return (
        <ModalBase
            fields={domainsFields}
            handleChangeIntersectionLogic={handleChangeIntersectionLogic}
            intersectionLogic={intersectionLogic}
            isOpen={Domains}
            label={chrome.i18n.getMessage(`attribute_key_Domains`)}
            onChange={handleChange}
            multiselect
        />
    );
};

export default DomainsModal;
