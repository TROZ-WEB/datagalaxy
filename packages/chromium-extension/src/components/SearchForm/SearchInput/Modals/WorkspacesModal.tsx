import React, { useEffect } from 'react';
import { useStoreState, useStoreDispatch, useStoreActions } from '../../../../store/hooks';
import FilterModal from '../FilterModal';
import FieldIcon from './FieldIcon';

const WorkspacesModal = () => {
    const dispatch = useStoreDispatch();
    const workspaces = useStoreState((state) => state.filters.workspaces);
    const { updateVersionId } = useStoreActions((actions) => actions.filters);

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
            label: workspace.defaultVersionName,
        };

        if (workspace.iconHash) {
            const newIcon = <FieldIcon hash={workspace.iconHash} />;
            w.icon = newIcon;
        }

        return w;
    });

    workspacesFields.unshift({ id: null, label: chrome.i18n.getMessage(`all_workspaces`) });

    const handleChange = (id) => {
        updateVersionId(id);
    };

    return (
        <FilterModal
            fields={workspacesFields}
            label={chrome.i18n.getMessage(`attribute_key_Workspace`)}
            onChange={handleChange}
        />
    );
};

export default WorkspacesModal;
