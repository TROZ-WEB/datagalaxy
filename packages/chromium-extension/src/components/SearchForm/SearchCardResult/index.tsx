import cx from 'clsx';
import React, { useState, useMemo } from 'react';
import { entitiesTypeRelatedInfos } from 'shared';
import Breadcrumb from '../../Breadcrumb';
import Status from '../../Entity/Status';
import Tags from '../../Entity/Tags';
import UserProfile from '../../Entity/UserProfile';
import OwnersStewardsSeparator from '../../OwnersStewardsSeparator';
import Glyph from '../../ui/Glyph';
import styles from './index.css';

const LIMIT_TAGS_ELLIPSE = 3;
const isTechnical = (entity): boolean => entitiesTypeRelatedInfos[entity.type].kind === 'Technical';

const SearchCardResult = ({
    alwaysExpanded = false,
    ellipseBreadCrumb,
    entity,
    onClick,
}: {
    alwaysExpanded?: boolean;
    ellipseBreadCrumb?: number;
    entity: any;
    onClick?: () => void;
}) => {
    const [isCardExpanded, setIsCardExpanded] = useState(alwaysExpanded);
    const [isMoreActionShown, setIsMoreActionsShown] = useState(false);

    const isRootEntity = useMemo<boolean>(() => entity?.path === `\\${entity?.name}`, [entity]);

    return (
        <div>
            {entity && (
                <div
                    className={cx(styles.Root, isCardExpanded ? styles.CardExpanded : null, {
                        [styles.CursorPointer]: !!onClick,
                    })}
                    onClick={onClick}
                    onKeyPress={onClick}
                    onMouseEnter={() => alwaysExpanded || setIsCardExpanded(true)}
                    onMouseLeave={() => alwaysExpanded || setIsCardExpanded(false)}
                    role="button"
                    tabIndex={0}
                >
                    <div className={styles.WrappedContainer}>
                        {entitiesTypeRelatedInfos[entity.type] ? (
                            <div
                                className={cx(
                                    styles.LeftSide,
                                    isTechnical(entity) ? styles.TechnicalColor : styles.FunctionalColor,
                                )}
                                title={chrome.i18n.getMessage(`entity_label_full_${entity.type}`)}
                            >
                                <div
                                    className={cx(
                                        styles.LeftSideBackground,
                                        isTechnical(entity)
                                            ? styles.TechnicalColorBackground
                                            : styles.FunctionalColorBackground,
                                    )}
                                />
                                <span className={styles.EntityGlyphWrapper}>
                                    <Glyph icon={entitiesTypeRelatedInfos[entity.type].glyph} />
                                </span>
                                <span
                                    className={cx(
                                        styles.EntityTypeShortLabel,
                                        isTechnical(entity) ? styles.TechnicalColor : styles.FunctionalColor,
                                    )}
                                >
                                    {chrome.i18n.getMessage(`entity_label_short_${entity.type}`)}
                                </span>
                            </div>
                        ) : (
                            <div className={cx(styles.LeftSide)} />
                        )}
                        <div className={styles.RightSide}>
                            {!isRootEntity && (
                                <div className={styles.BreadcrumbWrapper}>
                                    <Breadcrumb ellipse={ellipseBreadCrumb} path={entity.path} />
                                </div>
                            )}
                            <span
                                className={styles.EntityName}
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
                            <div className={styles.InfosWrapper}>
                                {entity.attributes?.status && (
                                    <>
                                        <Status status={entity.attributes?.status} hideLabel />
                                        <OwnersStewardsSeparator />
                                    </>
                                )}

                                {entity.attributes?.tags?.length > 0 && (
                                    <>
                                        <Tags className={styles.TagsWrapper}>
                                            {entity?.attributes?.tags?.map((tag, idx) => {
                                                if (idx > LIMIT_TAGS_ELLIPSE) {
                                                    return null;
                                                }

                                                return (
                                                    <Tags.Item
                                                        key={tag}
                                                        hideLabel={entity?.attributes?.tags?.length > 1}
                                                        tag={tag}
                                                    />
                                                );
                                            })}
                                            {entity?.attributes?.tags?.length > LIMIT_TAGS_ELLIPSE && (
                                                <Glyph className={styles.SmallGlyph} icon="Add" />
                                            )}
                                        </Tags>
                                        <OwnersStewardsSeparator />
                                    </>
                                )}

                                <div className={styles.AssociatedUsersWrapper}>
                                    {entity.owners && (
                                        <UserProfile governanceRole="owner" users={entity.owners} hideLabel />
                                    )}
                                    {entity.owners && <OwnersStewardsSeparator />}
                                    {entity.stewards && (
                                        <UserProfile governanceRole="steward" users={entity.stewards} />
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default SearchCardResult;
