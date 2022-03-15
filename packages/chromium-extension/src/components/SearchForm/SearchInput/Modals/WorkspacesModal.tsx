import React, { useEffect } from 'react';
import { useStoreState, useStoreDispatch, useStoreActions } from '../../../../store/hooks';
import FilterModal from '../FilterModal';

/* ---------- COMPONENT ---------- */

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

    const workspacesFields = workspaces?.projects?.map((item) => {
        return { id: item.defaultVersionId, label: item.name };
    });

    const handleChange = (id) => {
        console.log('id : ', id);
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
