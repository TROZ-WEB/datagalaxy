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

    const workspacesFields = workspaces?.map((workspace) => {
        interface field {
            id: string;
            label: string;
            icon?: React.ReactNode;
        }
        const w: field = {
            id: workspace.defaultVersionId,
            label: workspace.name,
        };

        if (workspace.iconHash) {
            const newIcon = <FieldIcon hash={workspace.iconHash} />;
            w.icon = newIcon;
        }

        return w;
    });

    workspacesFields?.unshift({ id: null, label: chrome.i18n.getMessage(`all_workspaces`) });

    const handleChange = (id) => {
        updateVersionId(id);
        const newPickedFilters = [...pickedFilters];
        const filterIndex = newPickedFilters?.findIndex((item) => item?.filter?.attributeKey === 'Workspace');
        if (filterIndex === -1) {
            const filter = {
                icon: workspacesFields.find((item) => item.id === id).icon,
                filter: { attributeKey: 'Workspace', operator: 'contains', values: [id] },
            };
            newPickedFilters.push(filter);
        } else {
            newPickedFilters[filterIndex].filter.values = [id];
            newPickedFilters[filterIndex].icon = workspacesFields.find((item) => item.id === id).icon;
        }

        updatePickedFilters(newPickedFilters);
    };

    return (
        <ModalBase
            fields={workspacesFields}
            isOpen={Workspace}
            label={chrome.i18n.getMessage(`attribute_key_Workspace`)}
            onChange={handleChange}
        />
    );
};

export default WorkspacesModal;
