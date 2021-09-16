import cx from 'clsx';
import React from 'react';
import { entitiesTypeRelatedInfos } from 'shared';
import Breadcrumb from '../../Breadcrumb';
import Status from '../../Entity/Status';
import UserProfile from '../../Entity/UserProfile';
import Glyph from '../../ui/Glyph';
import styles from './index.css';

const isTechnical = (entity): boolean => entitiesTypeRelatedInfos[entity.type].kind === 'Technical';

const SearchCardResult = ({
    alwaysExpanded = false,
    entity,
    onClick,
    showOwnership = true,
}: {
    alwaysExpanded?: boolean;
    entity: any;
    onClick?: () => void;
    showOwnership?: boolean;
}) => {
    return (
        <div
            className={cx(styles.Root, alwaysExpanded ? styles.RootAlwaysExpanded : styles.RootExpanded, {
                [styles.CursorPointer]: !!onClick,
            })}
            onClick={onClick}
            onKeyPress={onClick}
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
                    {showOwnership && (
                        <div className={styles.AssociatedUsersWrapper}>
                            <UserProfile governanceRole="owner" users={entity.owners} />
                            <UserProfile governanceRole="steward" users={entity.stewards} />
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default SearchCardResult;
