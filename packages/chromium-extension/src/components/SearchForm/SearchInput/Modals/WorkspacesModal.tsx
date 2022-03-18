import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { useStoreState, useStoreDispatch, useStoreActions } from '../../../../store/hooks';
import FilterModal from '../FilterModal';

/* ---------- STYLES ---------- */

const SIcon = styled.img`
    width: 20px;
    height: 20px;
    border-radius: 50%;
`;

/* ---------- COMPONENT ---------- */

const WorkspacesModal = () => {
    const dispatch = useStoreDispatch();
    const workspaces = useStoreState((state) => state.filters.workspaces);
    const { updateVersionId } = useStoreActions((actions) => actions.filters);
    const url = useStoreState((state) => state.auth.pubapi);
    const [workspacesFields, setWorkspacesFields] = useState([]);

    useEffect(() => {
        const fetchWorkspacesAPI = async () => {
            await dispatch.filters.fetchWorkspaces(null);
        };

        fetchWorkspacesAPI();

        const newWorkspacesFields = workspaces?.map((workspace) => {
            const w = workspace;
            if (w.icon) {
                const newIcon = <SIcon src={`${url}/image?hash=${workspace.icon}`} />;
                w.icon = newIcon;
            }

            return w;
        });

        setWorkspacesFields(newWorkspacesFields);
    }, [dispatch]);

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
