import React, { useEffect, useState } from 'react';
import { useStoreState, useStoreDispatch, useStoreActions } from '../../../../store/hooks';
import FilterModal from '../FilterModal';

/* ---------- COMPONENT ---------- */

const StewardsModal = () => {
    const dispatch = useStoreDispatch();
    const users = useStoreState((state) => state.filters.users);
    const pickedFilters = useStoreState((state) => state.filters.pickedFilters);
    const { updatePickedFilters } = useStoreActions((actions) => actions.filters);
    const [intersectionLogic, setIntersectionLogic] = useState('or');
    const [usersFields, setUsersFields] = useState([]);

    useEffect(() => {
        const fetchUsersAPI = async () => {
            await dispatch.filters.fetchUsers(null);
        };

        fetchUsersAPI();
    }, [dispatch]);

    useEffect(() => {
        const index = pickedFilters?.findIndex((item) => item.attributeKey === 'DataStewards');
        const formatedUsersFields = users?.stewards?.map((item) => {
            return {
                id: item.userId,
                label: `${item.firstName} ${item.lastName}`,
                checked: !!pickedFilters?.[index]?.values?.includes(item.userId),
            };
        });
        setUsersFields(formatedUsersFields);
    }, [users, pickedFilters]);

    const handleChange = (id) => {
        const newPickedFilters = [...pickedFilters];
        const filterIndex = newPickedFilters?.findIndex((item) => item.attributeKey === 'DataStewards');
        const newOperator = intersectionLogic === 'or' ? 'contains' : 'matchAll';
        if (filterIndex === -1) {
            const filter = {
                attributeKey: 'DataStewards',
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
        const filterIndex = newPickedFilters?.findIndex((item) => item.attributeKey === 'DataStewards');
        const newOperator = params === 'or' ? 'contains' : 'matchAll';
        if (filterIndex !== -1) {
            newPickedFilters[filterIndex].operator = newOperator;
        }

        updatePickedFilters(newPickedFilters);
    };

    return (
        <FilterModal
            fields={usersFields}
            handleChangeIntersectionLogic={handleChangeIntersectionLogic}
            intersectionLogic={intersectionLogic}
            label={chrome.i18n.getMessage(`entity_steward`)}
            onChange={handleChange}
            multiselect
        />
    );
};

export default StewardsModal;
