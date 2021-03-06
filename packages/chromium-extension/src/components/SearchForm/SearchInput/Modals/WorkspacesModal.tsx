import React, { useEffect, FC } from 'react';
import styled from 'styled-components';
import { useStoreState, useStoreDispatch, useStoreActions } from '../../../../store/hooks';
import WorkspaceIconPlaceholder from '../../../WorkspaceIconPlaceholder';
import ModalBase, { Field } from '../ModalBase';
import { useSortArray } from './utils';
import WorkspaceIcon from './WorkspaceIcon';

const SWorkspaceWrapper = styled.div`
    margin-top: 2px;
`;

/* ---------- COMPONENT ---------- */

const WorkspacesModal: FC = () => {
    const dispatch = useStoreDispatch();
    const { workspaces, pickedFilters } = useStoreState((state) => state.filters);
    const { updateVersionId, updatePickedFilters } = useStoreActions((actions) => actions.filters);
    const { Workspace } = useStoreState((state) => state.modal);
    const { sortArray } = useSortArray();

    useEffect(() => {
        const fetchWorkspacesAPI = async () => {
            await dispatch.filters.fetchWorkspaces(null);
        };

        fetchWorkspacesAPI();
    }, [dispatch]);

    const index = pickedFilters?.findIndex((item) => item?.filter?.attributeKey === 'Workspace');

    const workspacesFields = workspaces?.map((workspace) => {
        const name = chrome.i18n.getMessage(`attribute_key_Workspace`);
        const w: Field = {
            id: workspace.defaultVersionId,
            label: workspace.name,
            checked: !!pickedFilters?.[index]?.filter?.values?.includes(workspace.defaultVersionId),
            name,
            nameUnit: name,
        };

        let newIcon;

        if (workspace.iconHash) {
            newIcon = (
                <SWorkspaceWrapper>
                    <WorkspaceIcon hash={workspace.iconHash} />
                </SWorkspaceWrapper>
            );
        } else {
            newIcon = (
                <SWorkspaceWrapper>
                    <WorkspaceIconPlaceholder workspaceTrigram={workspace?.trigram} />
                </SWorkspaceWrapper>
            );
        }

        w.icon = newIcon;

        return w;
    });

    sortArray(workspacesFields);

    workspacesFields?.unshift({
        id: null,
        label: chrome.i18n.getMessage(`all_workspaces`),
        checked: index === -1,
        name: '',
    });

    const handleChange = (field) => {
        updateVersionId(field.id);
        const newPickedFilters = [...pickedFilters];
        const filterIndex = newPickedFilters?.findIndex((item) => item?.filter?.attributeKey === 'Workspace');

        if (filterIndex !== -1) {
            newPickedFilters.splice(filterIndex, 1);
        }

        const name = chrome.i18n.getMessage(`attribute_key_Workspace`);
        if (field.id) {
            const filter = {
                icon: [workspacesFields.find((item) => item.id === field.id).icon],
                content: [field.label],
                name,
                nameUnit: name,
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
