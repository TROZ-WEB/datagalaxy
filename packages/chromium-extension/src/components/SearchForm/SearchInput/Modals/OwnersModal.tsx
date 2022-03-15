import React, { useEffect } from 'react';
import { useStoreState, useStoreDispatch, useStoreActions } from '../../../../store/hooks';
import FilterModal from '../FilterModal';

/* ---------- COMPONENT ---------- */

const OwnersModal = () => {
    const dispatch = useStoreDispatch();
    const users = useStoreState((state) => state.filters.users);
    const pickedFilters = useStoreState((state) => state.filters.pickedFilters);
    const { updatePickedFilters } = useStoreActions((actions) => actions.filters);

    useEffect(() => {
        const fetchUsersAPI = async () => {
            await dispatch.filters.fetchUsers(null);
        };

        fetchUsersAPI();
    }, [dispatch]);

    const usersFields = users?.owners?.map((item) => {
        return {
            id: item.userId,
            label: `${item.firstName} ${item.lastName}`,
        };
    });

    const handleChange = (id) => {
        const newPickedFilters = [...pickedFilters];
        const filterIndex = newPickedFilters?.findIndex((item) => item.attributeKey === 'DataOwners');
        if (filterIndex === -1) {
            const filter = {
                attributeKey: 'DataOwners',
                operator: 'contains',
                values: [id],
            };
            newPickedFilters.push(filter);
        } else {
            const { values } = newPickedFilters[filterIndex];
            const idIndex = values?.findIndex((item) => item === id);

            if (idIndex === -1) {
                values.push(id);
            } else {
                values.splice(idIndex, 1);
            }
        }

        updatePickedFilters(newPickedFilters);
    };

    return (
        <FilterModal
            fields={usersFields}
            label={chrome.i18n.getMessage(`attribute_key_Owner`)}
            onChange={handleChange}
            multiselect
        />
    );
};

export default OwnersModal;
