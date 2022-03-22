import React, { useEffect, FC } from 'react';
import { useStoreState, useStoreDispatch, useStoreActions } from '../../../../store/hooks';
import ModalBase from '../ModalBase';
import FieldIcon from './FieldIcon';

/* ---------- COMPONENT ---------- */

const TechnologiesModal: FC = () => {
    const dispatch = useStoreDispatch();
    const technologies = useStoreState((state) => state.filters.technologies);
    const pickedFilters = useStoreState((state) => state.filters.pickedFilters);
    const { updatePickedFilters } = useStoreActions((actions) => actions.filters);
    const { TechnologyCode } = useStoreState((state) => state.modal);

    useEffect(() => {
        const fetchTechnologiesAPI = async () => {
            await dispatch.filters.fetchTechnologies(null);
        };

        fetchTechnologiesAPI();
    }, [dispatch]);

    const technologiesFields = technologies?.map((technology) => {
        interface field {
            id: string;
            label: string;
            icon?: React.ReactNode;
        }
        const t: field = {
            id: technology.technologyCode,
            label: technology.displayName,
        };

        if (technology.imageHash) {
            const newIcon = <FieldIcon hash={technology.imageHash} />;
            t.icon = newIcon;
        }

        return t;
    });

    const handleChange = (id) => {
        const newPickedFilters = [...pickedFilters];
        const filterIndex = newPickedFilters?.findIndex((item) => item?.filter?.attributeKey === 'TechnologyCode');
        if (filterIndex === -1) {
            const filter = {
                icon: technologiesFields.find((item) => item.id === id).icon,
                filter: { attributeKey: 'TechnologyCode', operator: 'contains', values: [id] },
            };
            newPickedFilters.push(filter);
        } else {
            newPickedFilters[filterIndex].filter.values = [id];
            newPickedFilters[filterIndex].icon = technologiesFields.find((item) => item.id === id).icon;
        }

        updatePickedFilters(newPickedFilters);
    };

    return (
        <ModalBase
            fields={technologiesFields}
            isOpen={TechnologyCode}
            label={chrome.i18n.getMessage(`attribute_key_TechnologyCode`)}
            onChange={handleChange}
        />
    );
};

export default TechnologiesModal;
