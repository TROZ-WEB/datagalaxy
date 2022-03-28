import React, { useEffect, useState, FC } from 'react';
import { useStoreState, useStoreDispatch } from '../../../../store/hooks';
import Avatar from '../../../Avatar';
import ModalBase from '../ModalBase';

/* ---------- COMPONENT ---------- */

const StewardsModal: FC = () => {
    const dispatch = useStoreDispatch();
    const users = useStoreState((state) => state.filters.users);
    const pickedFilters = useStoreState((state) => state.filters.pickedFilters);
    const [operator, setOperator] = useState('or');
    const [usersFields, setUsersFields] = useState([]);
    const { DataStewards } = useStoreState((state) => state.modal);

    useEffect(() => {
        const fetchUsersAPI = async () => {
            await dispatch.filters.fetchUsers(null);
        };

        fetchUsersAPI();
    }, [dispatch]);

    useEffect(() => {
        const index = pickedFilters?.findIndex((item) => item?.filter?.attributeKey === 'DataStewards');
        const formatedUsersFields = users?.stewards?.map((item) => {
            return {
                id: item.userId,
                label: `${item.firstName} ${item.lastName}`,
                icon: <Avatar size="mini" user={item} />,
                checked: !!pickedFilters?.[index]?.filter?.values?.includes(item.userId),
            };
        });
        setUsersFields(formatedUsersFields);
    }, [users, pickedFilters]);

    return (
        <ModalBase
            attributeKey="DataStewards"
            fields={usersFields}
            isOpen={DataStewards}
            operator={operator}
            setOperator={setOperator}
            multiselect
        />
    );
};

export default StewardsModal;
