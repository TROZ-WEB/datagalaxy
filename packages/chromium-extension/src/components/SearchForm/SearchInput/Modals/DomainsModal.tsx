import React, { useEffect, useState, FC } from 'react';
import { useStoreState, useStoreDispatch } from '../../../../store/hooks';
import ColorPoint from '../../../ui/ColorPoint';
import ModalBase from '../ModalBase';
import { useSortArray } from './utils';

/* ---------- COMPONENT ---------- */

const DomainsModal: FC = () => {
    const dispatch = useStoreDispatch();
    const domains = useStoreState((state) => state.filters.domains);
    const pickedFilters = useStoreState((state) => state.filters.pickedFilters);
    const { Domains } = useStoreState((state) => state.modal);
    const [operator, setOperator] = useState('or');
    const [domainsFields, setDomainsFields] = useState([]);
    const { sortArray } = useSortArray();

    useEffect(() => {
        const fetchDomainsAPI = async () => {
            await dispatch.filters.fetchDomains(null);
        };

        fetchDomainsAPI();
    }, [dispatch]);

    useEffect(() => {
        const index = pickedFilters?.findIndex((item) => item?.filter?.attributeKey === 'Domains');
        const formatedDomainsFields = domains?.map((item) => ({
            id: item.id,
            label: item.label,
            icon: <ColorPoint color={item.color} />,
            checked: !!pickedFilters?.[index]?.filter?.values?.includes(item.id),
            name: chrome.i18n.getMessage(`attribute_key_Domains`),
            nameUnit: chrome.i18n.getMessage(`attribute_key_unit_Domains`),
        }));
        setDomainsFields(formatedDomainsFields);
    }, [domains, pickedFilters]);

    sortArray(domainsFields);

    return (
        <ModalBase
            attributeKey="Domains"
            fields={domainsFields}
            isOpen={Domains}
            operator={operator}
            setOperator={setOperator}
            multiselect
        />
    );
};

export default DomainsModal;
