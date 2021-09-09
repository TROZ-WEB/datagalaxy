import React from 'react';
import cx from 'clsx';
import { useHistory } from 'react-router-dom';
import { entitiesTypeRelatedInfos } from 'shared';
import Breadcrumb from '../../Breadcrumb';
import Status from '../../Entity/Status';
import UserProfile from '../../Entity/UserProfile';
import Glyph from '../../ui/Glyph';
import styles from './index.css';
import { useStoreActions } from '../../../store/hooks';

const isTechnical = (entity): boolean => entitiesTypeRelatedInfos[entity.type].kind === 'Technical';

const SearchCardResult = ({ entity, alwaysExpanded = false }: { entity: any; alwaysExpanded?: boolean }) => {
    const history = useHistory();

    const { updateSelectedEntity } = useStoreActions((actions) => actions.search);

    const onCardResultClick = () => {
        updateSelectedEntity(entity);
        history.push(`/app/entities/${entity.id}`);
    };

    return (
        <div
            className={cx(styles.Root, alwaysExpanded ? styles.RootAlwaysExpanded : styles.RootExpanded)}
            onClick={onCardResultClick}
            onKeyPress={onCardResultClick}
            role="button"
            tabIndex={0}
        >
            <div className={cx(styles.LeftSide, isTechnical(entity) ? styles.TechnicalColor : styles.FunctionalColor)}>
                <div
                    className={cx(
                        styles.LeftSideBackground,
                        isTechnical(entity) ? styles.TechnicalColorBackground : styles.FunctionalColorBackground,
                    )}
                />
                <Glyph icon={entitiesTypeRelatedInfos[entity.type].glyph} />
            </div>
            <div className={styles.RightSide}>
                <div className={styles.BreadcrumbWrapper}>
                    <Breadcrumb path={entity.path} />
                </div>
                <a className={styles.EntityName} href={entity.objectUrl} rel="noreferrer" target="_blank">
                    {entity.name}
                </a>
                <div className={styles.ExpandedWrapper}>
                    <Status status={entity.attributes.status} />
                    <div className={styles.AssociatedUsersWrapper}>
                        <UserProfile
                            firstName={entity.owner.firstName}
                            governanceRole="owner"
                            lastName={entity.owner.lastName}
                            profileThumbnailUrl={entity.owner.profileThumbnailUrl}
                        />
                        <UserProfile
                            firstName={entity.steward.firstName}
                            governanceRole="steward"
                            lastName={entity.steward.lastName}
                            profileThumbnailUrl={entity.steward.profileThumbnailUrl}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SearchCardResult;
