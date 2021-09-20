import cx from 'clsx';
import React, { useState } from 'react';
import { entitiesTypeRelatedInfos } from 'shared';
import Breadcrumb from '../../Breadcrumb';
import Status from '../../Entity/Status';
import Tags from '../../Entity/Tags';
import UserProfile from '../../Entity/UserProfile';
import OwnersStewardsSeparator from '../../OwnersStewardsSeparator';
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
    const [isMoreActionShown, setIsMoreActionsShown] = useState(false);

    return (
        <div
            className={cx(styles.Root, {
                [styles.CursorPointer]: !!onClick,
                [styles.RootExpanded]: !alwaysExpanded,
            })}
            onClick={onClick}
            onKeyPress={onClick}
            role="button"
            tabIndex={0}
        >
            <div className={styles.WrappedContainer}>
                <div
                    className={cx(
                        styles.LeftSide,
                        isTechnical(entity) ? styles.TechnicalColor : styles.FunctionalColor,
                    )}
                >
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
                    <span
                        onMouseEnter={() => setIsMoreActionsShown(true)}
                        onMouseLeave={() => setIsMoreActionsShown(false)}
                    >
                        {entity.name}
                        {isMoreActionShown && (
                            /* eslint-disable jsx-a11y/control-has-associated-label, jsx-a11y/anchor-has-content */
                            <a
                                className={styles.EntityNameMoreActionsIcon}
                                href={entity.objectUrl}
                                rel="noreferrer"
                                target="_blank"
                            />
                        )}
                    </span>
                    <Tags className={styles.TagsWrapper}>
                        {entity.attributes.tags.map((tag) => (
                            <Tags.Item key={tag} hideLabel={entity.attributes.tags.length > 1} tag={tag} />
                        ))}
                    </Tags>
                </div>
            </div>
            <div className={styles.ExpandedWrapper}>
                <Status status={entity.attributes.status} />
                {showOwnership && (
                    <>
                        <OwnersStewardsSeparator />
                        <div className={styles.AssociatedUsersWrapper}>
                            <UserProfile governanceRole="owner" users={entity.owners} />
                            <OwnersStewardsSeparator />
                            <UserProfile governanceRole="steward" users={entity.stewards} />
                        </div>
                    </>
                )}
            </div>
        </div>
    );
};

export default SearchCardResult;
