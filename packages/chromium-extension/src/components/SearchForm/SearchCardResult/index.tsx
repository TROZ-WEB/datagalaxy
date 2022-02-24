import cx from 'clsx';
import React, { useState, useMemo, FC } from 'react';
import { entitiesTypeRelatedInfos } from 'shared';
import Breadcrumb from '../../Breadcrumb';
import Status from '../../Entity/Status';
import Tags from '../../Entity/Tags';
import UserProfile from '../../Entity/UserProfile';
import OwnersStewardsSeparator from '../../OwnersStewardsSeparator';
import Glyph from '../../ui/Glyph';
import TechnicalLogoPlaceholder from '../../../../assets/technical-logo-placeholder.png';
import styles from './index.css';

const LIMIT_TAGS_ELLIPSE = 3;

interface SearchCardResultProps {
    alwaysExpanded?: boolean;
    ellipseBreadCrumb?: number;
    entity: any;
    EntityPage: boolean;
    onClick?: () => void;
}

const SearchCardResult: FC<SearchCardResultProps> = ({
    alwaysExpanded = false,
    ellipseBreadCrumb,
    entity,
    EntityPage,
    onClick,
}) => {
    const [isCardExpanded, setIsCardExpanded] = useState(alwaysExpanded);
    const [isMoreActionShown, setIsMoreActionsShown] = useState(false);

    const isRootEntity = useMemo<boolean>(() => entity?.path === `\\${entity?.name}`, [entity]);
    const DGGlyph = entitiesTypeRelatedInfos[entity.type];

    // TODO : Link to API (Waiting for API feature)
    const isTechnicalLogo = true;

    return (
        <div>
            {entity && (
                <div
                    className={cx(styles.Root, isCardExpanded && styles.CardExpanded, EntityPage && styles.EntityPage, {
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
                        <div
                            className={styles.LeftSide}
                            title={chrome.i18n.getMessage(`entity_label_full_${entity.type}`)}
                        >
                            {isTechnicalLogo ? (
                                <>
                                    <img
                                        alt="Technical Logo"
                                        className={styles.TechnicalLogo}
                                        src={TechnicalLogoPlaceholder}
                                    />
                                    <div className={styles.EntityDGGlyphContainer}>
                                        <Glyph
                                            className={cx(styles.EntityDGGlyph, {
                                                [styles.Dictionary]: DGGlyph.kind === 'Dictionary',
                                                [styles.Dataprocessing]: DGGlyph.kind === 'Dataprocessing',
                                                [styles.Glossary]: DGGlyph.kind === 'Glossary',
                                                [styles.Uses]: DGGlyph.kind === 'Uses',
                                            })}
                                            icon={DGGlyph.glyph}
                                        />
                                    </div>
                                </>
                            ) : (
                                <Glyph
                                    className={cx(styles.BigEntityDGGlyph, {
                                        [styles.Dictionary]: DGGlyph.kind === 'Dictionary',
                                        [styles.Dataprocessing]: DGGlyph.kind === 'Dataprocessing',
                                        [styles.Glossary]: DGGlyph.kind === 'Glossary',
                                        [styles.Uses]: DGGlyph.kind === 'Uses',
                                    })}
                                    icon={DGGlyph.glyph}
                                />
                            )}
                            {!EntityPage && (
                                <span className={styles.EntityTypeShortLabel}>
                                    {chrome.i18n.getMessage(`entity_label_short_${entity.type}`)}
                                </span>
                            )}
                        </div>

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
