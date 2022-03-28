import React, { useEffect, FC } from 'react';
import { useStoreState, useStoreDispatch, useStoreActions } from '../../../../store/hooks';
import ModalBase from '../ModalBase';
import FieldIcon from './FieldIcon';

/* ---------- COMPONENT ---------- */

const WorkspacesModal: FC = () => {
    const dispatch = useStoreDispatch();
    const { workspaces, pickedFilters } = useStoreState((state) => state.filters);
    const { updateVersionId, updatePickedFilters } = useStoreActions((actions) => actions.filters);
    const { Workspace } = useStoreState((state) => state.modal);

    useEffect(() => {
        const fetchWorkspacesAPI = async () => {
            await dispatch.filters.fetchWorkspaces(null);
        };

        fetchWorkspacesAPI();
    }, [dispatch]);

    const index = pickedFilters?.findIndex((item) => item?.filter?.attributeKey === 'Workspace');

    const workspacesFields = workspaces?.map((workspace) => {
        interface field {
            id: string;
            label: string;
            icon?: React.ReactNode;
            checked: boolean;
        }

        const w: field = {
            id: workspace.defaultVersionId,
            label: workspace.name,
            checked: !!pickedFilters?.[index]?.filter?.values?.includes(workspace.defaultVersionId),
        };

        if (workspace.iconHash) {
            const newIcon = <FieldIcon hash={workspace.iconHash} />;
            w.icon = newIcon;
        }

        return w;
    });

    workspacesFields?.unshift({ id: null, label: chrome.i18n.getMessage(`all_workspaces`), checked: index === -1 });

    const handleChange = (field) => {
        updateVersionId(field.id);
        const newPickedFilters = [...pickedFilters];
        const filterIndex = newPickedFilters?.findIndex((item) => item?.filter?.attributeKey === 'Workspace');

        if (filterIndex !== -1) {
            newPickedFilters.splice(filterIndex, 1);
        }

        if (field.id) {
            const filter = {
                icon: [workspacesFields.find((item) => item.id === field.id).icon],
                label: [field.label],
                filter: { attributeKey: 'Workspace', operator: 'contains', values: [field.id] },
            };
            newPickedFilters.push(filter);
        }

        updatePickedFilters(newPickedFilters);
    };

    return (
        <ModalBase attributeKey="Workspace" fields={workspacesFields} handleChange={handleChange} isOpen={Workspace} />
    );
};

export default WorkspacesModal;
