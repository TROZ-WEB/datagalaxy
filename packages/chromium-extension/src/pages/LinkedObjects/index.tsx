import React, { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { DataTypeMapping } from 'shared';
import Accordion from '../../components/Accordion';
import SearchCardResult from '../../components/SearchForm/SearchCardResult';
import { useStoreDispatch, useStoreActions, useStoreState } from '../../store/hooks';
import styles from './index.css';

const LinkedObjects = () => {
    const quickEntityFromSearch = useStoreState((state) => state.search.selectedEntity);
    const history = useHistory();

    const dispatch = useStoreDispatch();
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
        }

        return () => {};
    }, [dispatch, quickEntityFromSearch]);

    return (
        <div className={styles.Root}>
            {linkedObjects &&
                Object.keys(linkedObjects).map((key) => {
                    return (
                        <div key={key} className={styles.AccordionWrapper}>
                            <Accordion
                                openButtonPosition="left"
                                sizeOfTitle="big"
                                title={chrome.i18n.getMessage(key)}
                                initialOpen
                            >
                                <div className={styles.SearchCardsResultWrapper}>
                                    {linkedObjects[key].map((linkedObject) => {
                                        return (
                                            <SearchCardResult
                                                key={linkedObject.id}
                                                entity={linkedObject}
                                                onClick={() => {
                                                    updateSelectedEntity(linkedObject);
                                                    history.push(`/app/entities/${linkedObject.id}/`);
                                                }}
                                                alwaysExpanded
                                            />
                                        );
                                    })}
                                </div>
                            </Accordion>
                        </div>
                    );
                })}
        </div>
    );
};

export default LinkedObjects;
