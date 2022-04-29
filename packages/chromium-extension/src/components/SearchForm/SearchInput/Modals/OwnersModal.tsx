import React, { useEffect, useState, useMemo, FC } from 'react';
import { useStoreState, useStoreDispatch } from '../../../../store/hooks';
import Avatar from '../../../Avatar';
import ModalBase, { Field } from '../ModalBase';
import { useSortArray } from './utils';

/* ---------- COMPONENT ---------- */

const OwnersModal: FC = () => {
    const dispatch = useStoreDispatch();
    const users = useStoreState((state) => state.filters.users);
    const pickedFilters = useStoreState((state) => state.filters.pickedFilters);
    const [operator, setOperator] = useState('or');
    const { DataOwners } = useStoreState((state) => state.modal);
    const { sortArray } = useSortArray();

    useEffect(() => {
        const fetchUsersAPI = async () => {
            await dispatch.filters.fetchUsers(null);
        };

        fetchUsersAPI();
    }, [dispatch]);

    const usersFields = useMemo(() => {
        const index = pickedFilters?.findIndex((item) => item?.filter?.attributeKey === 'DataOwners');

        const formatedUsersFields: Field[] = users?.owners?.map((item) => ({
            id: item.userId,
            label: `${item.firstName} ${item.lastName}`,
            icon: <Avatar role="owner" showTooltip={false} size="mini" user={item} />, // eslint-disable-line jsx-a11y/aria-role
            checked: !!pickedFilters?.[index]?.filter?.values?.includes(item.userId),
            name: chrome.i18n.getMessage(`attribute_key_DataOwners`),
            nameUnit: chrome.i18n.getMessage(`attribute_key_unit_DataOwners`),
        }));

        return formatedUsersFields;
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
