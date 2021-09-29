import React, { useEffect, useState } from 'react';
import { EntityType } from 'shared';
import Accordion from '../../../../components/Accordion';
import Status from '../../../../components/Entity/Status';
import Tags from '../../../../components/Entity/Tags';
import SearchCardResult from '../../../../components/SearchForm/SearchCardResult';
import { useStoreState } from '../../../../store/hooks';
import styles from './index.css';

const Details = () => {
    const initialEntity = useStoreState((state) => state.search.selectedEntity);
    const fullyLoadedEntity = useStoreState((state) => state.entity.displayedEntity);

    // Initialize the entity with data coming from search to be able to
    // display some information instantly
    const [entity, setEntity] = useState<EntityType>(initialEntity);
    const [loaded, setLoaded] = useState<boolean>(false);

    useEffect(() => {
        if (fullyLoadedEntity) {
            setEntity(fullyLoadedEntity);
            setLoaded(true);
        }
    }, [fullyLoadedEntity]);

    return (
        <div className={styles.Root}>
            <SearchCardResult ellipseBreadCrumb={9} entity={entity} alwaysExpanded />
            {loaded && (
                <div className={styles.AccordionWrapper}>
                    <Accordion title={chrome.i18n.getMessage(`entity_details_sections_general`)} initialOpen>
                        <Details.SubInfo title={chrome.i18n.getMessage(`entity_details_sections_general_status`)}>
                            <Status status={entity.attributes.status} />
                        </Details.SubInfo>
                        <Details.Separator />
                        <Details.SubInfo title={chrome.i18n.getMessage(`entity_details_sections_general_tags`)}>
                            <Tags>
                                {entity.attributes.tags.map((tag) => (
                                    <Tags.Item key={tag} hideLabel={entity.attributes.tags.length > 1} tag={tag} />
                                ))}
                            </Tags>
                        </Details.SubInfo>
                        <Details.Separator />
                        <Details.SubInfo title={chrome.i18n.getMessage(`entity_details_sections_general_summary`)}>
                            {entity.attributes.summary}
                        </Details.SubInfo>
                        <Details.Separator />
                        <Details.SubInfo title={chrome.i18n.getMessage(`entity_details_sections_general_description`)}>
                            {entity.attributes.description}
                        </Details.SubInfo>
                    </Accordion>
                </div>
            )}
        </div>
    );
};

Details.SubInfo = ({ title, children }: { title: string; children: React.ReactNode }) => {
    return (
        <div className={styles.SubInfoWrapper}>
            <span className={styles.SubInfoTitle}>{title}</span>
            <span className={styles.SubInfoContent}>{children}</span>
        </div>
    );
};
Details.Separator = () => {
    return <div className={styles.Separator} />;
};

export default Details;
