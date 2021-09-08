import React, { useEffect, useState } from 'react';
import styles from './index.css';
import SearchCardResult from '../../../../components/SearchForm/SearchCardResult';
import Accordion from '../../../../components/Accordion';
import { useStoreState } from '../../../../store/hooks';
import Status from '../../../../components/Entity/Status';
import { EntityType } from '../../../../../../shared/dist/shared';

const Details = () => {
    const initialEntity = useStoreState((state) => state.search.selectedEntity);
    const fullyLoadedEntity = useStoreState((state) => state.entity.displayedEntity);

    // Initialize the entity with data coming from search to be able to
    // display some information instantly
    const [entity, setEntity] = useState<EntityType>(initialEntity);

    useEffect(() => {
        if (fullyLoadedEntity) {
            setEntity(fullyLoadedEntity);
        }
    }, [fullyLoadedEntity]);

    return (
        <div className={styles.Root}>
            <SearchCardResult entity={entity} alwaysExpanded />
            <div className={styles.AccordionWrapper}>
                <Accordion title="Général" initialOpen>
                    <Details.SubInfo title="Status :">
                        <Status status={entity.attributes.status} />
                    </Details.SubInfo>
                    <Details.SubInfo title="Tag :">Tagname....</Details.SubInfo>
                </Accordion>
                <Accordion title="Responsables">todo</Accordion>
            </div>
        </div>
    );
};

Details.SubInfo = ({ title, children }: { title: string; children: React.ReactNode }) => {
    return (
        <div className={styles.SubInfoWrapper}>
            <span className={styles.SubInfoTitle}>{title}</span>
            {children}
        </div>
    );
};

export default Details;
