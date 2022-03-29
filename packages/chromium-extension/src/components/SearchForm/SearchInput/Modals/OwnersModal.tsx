import React, { useEffect, useState, FC } from 'react';
import { useStoreState, useStoreDispatch } from '../../../../store/hooks';
import Avatar from '../../../Avatar';
import ModalBase from '../ModalBase';
import { useSortArray } from './utils';

/* ---------- COMPONENT ---------- */

const OwnersModal: FC = () => {
    const dispatch = useStoreDispatch();
    const users = useStoreState((state) => state.filters.users);
    const pickedFilters = useStoreState((state) => state.filters.pickedFilters);
    const [operator, setOperator] = useState('or');
    const [usersFields, setUsersFields] = useState([]);
    const { DataOwners } = useStoreState((state) => state.modal);
    const { sortArray } = useSortArray();

    useEffect(() => {
        const fetchUsersAPI = async () => {
            await dispatch.filters.fetchUsers(null);
        };

        fetchUsersAPI();
    }, [dispatch]);

    useEffect(() => {
        const index = pickedFilters?.findIndex((item) => item?.filter?.attributeKey === 'DataOwners');
        const formatedUsersFields = users?.owners?.map((item) => {
            return {
                id: item.userId,
                label: `${item.firstName} ${item.lastName}`,
                icon: <Avatar size="mini" user={item} />,
                checked: !!pickedFilters?.[index]?.filter?.values?.includes(item.userId),
            };
        });
        setUsersFields(formatedUsersFields);
    }, [users, pickedFilters]);

    sortArray(usersFields);

    return (
        <ModalBase
            attributeKey="DataOwners"
            fields={usersFields}
            isOpen={DataOwners}
            operator={operator}
            setOperator={setOperator}
            multiselect
        />
    );
};

export default OwnersModal;
