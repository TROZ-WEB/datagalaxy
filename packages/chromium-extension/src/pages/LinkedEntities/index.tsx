import React, { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { DataTypeMapping } from 'shared';
import Accordion from '../../components/Accordion';
import SearchCardResult from '../../components/SearchForm/SearchCardResult';
import { useStoreDispatch, useStoreActions, useStoreState } from '../../store/hooks';
import styles from './index.css';

const LinkedEntities = () => {
    const quickEntityFromSearch = useStoreState((state) => state.search.selectedEntity);
    const history = useHistory();

    const dispatch = useStoreDispatch();
    const { updateDisplayedEntity } = useStoreActions((actions) => actions.entity);
    const { updateSelectedEntity } = useStoreActions((actions) => actions.search);

    const linkedObjects = useStoreState((state) => state.entity.linkedObjects);

    useEffect(() => {
        if (quickEntityFromSearch) {
            const fetchLinkedObjects = async () => {
                await dispatch.entity.fetchLinkedObjects({
                    id: quickEntityFromSearch.id,
                    dataType: DataTypeMapping[quickEntityFromSearch.dataType],
                    type: quickEntityFromSearch.type,
                    name:
                        DataTypeMapping[quickEntityFromSearch.dataType].entity === DataTypeMapping.Property // TODO: API Ignore technical for properties, should be fix in a moment
                            ? quickEntityFromSearch.name
                            : quickEntityFromSearch.technicalName,
                    versionId: quickEntityFromSearch.location.split('/')[1],
                });
            };

            fetchLinkedObjects();

            return () => {
                // Clear loaded entity in search model and entity model
                updateDisplayedEntity(null);
                updateSelectedEntity(null);
            };
        }

        return () => {};
    }, [dispatch]);

    return (
        <div className={styles.Root}>
            {Object.keys(linkedObjects).map((key) => {
                return (
                    <div className={styles.AccordionWrapper}>
                        <Accordion title={chrome.i18n.getMessage(key)} initialOpen>
                            {linkedObjects[key].map((linkedObject) => {
                                return (
                                    <SearchCardResult
                                        entity={linkedObject}
                                        onClick={() => {
                                            updateSelectedEntity(linkedObject);
                                            history.push(`/app/entities/${linkedObject.id}/`);
                                        }}
                                        alwaysExpanded
                                    />
                                );
                            })}
                        </Accordion>
                    </div>
                );
            })}
        </div>
    );
};

export default LinkedEntities;
