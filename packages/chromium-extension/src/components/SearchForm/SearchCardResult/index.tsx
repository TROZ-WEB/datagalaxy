import React, { useState, useMemo, FC } from 'react';
import { entitiesTypeRelatedInfos } from 'shared';
import styled, { css } from 'styled-components';
import Breadcrumb from '../../Breadcrumb';
import Status from '../../Entity/Status';
import Tags from '../../Entity/Tags';
import UserProfile from '../../Entity/UserProfile';
import OwnersStewardsSeparator from '../../OwnersStewardsSeparator';
import Glyph from '../../ui/Glyph';
import Out from '../../../../assets/icons/out.svg';
import TechnicalLogoPlaceholder from '../../../../assets/technical-logo-placeholder.png';

/* ---------- STYLES ---------- */

const SAssociatedUsersWrapper = styled.div`
    display: flex;
    flex-direction: row;
`;

const SBreadcrumbWrapper = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    min-height: 19px;
`;

const SGlyph = styled(Glyph)`
    font-size: 8px !important;
`;

const SInfosWrapper = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    margin-top: 10px;
`;

const SEntityDGGlyph = styled(Glyph)`
    font-size: 16px;

    ${(props) =>
        props.kind === 'dictionary' &&
        css`
            color: #28aae2;
            fill: #28aae2;
        `}

    ${(props) =>
        props.kind === 'dataprocessing' &&
        css`
            color: #1035b1;
            fill: #1035b1;
        `}

    ${(props) =>
        props.kind === 'glossary' &&
        css`
            color: #50c516;
            fill: #50c516;
        `}

    ${(props) =>
        props.kind === 'uses' &&
        css`
            color: #12884b;
            fill: #12884b;
        `}

    ${(props) => props.big && 'font-size: 24px'}
`;

const SEntityDGGlyphContainer = styled.div`
    position: absolute;
    background-color: #ffffff;
    width: 18px;
    height: 18px;
    top: 50%;
    right: 0%;
    transform: translate(50%, -50%);
    box-shadow: 0px 0px 2px 2px rgba(0, 76, 255, 0.08);
    border-radius: 3px;
    display: flex;
    align-items: center;
    justify-content: center;
`;

const SEntityName = styled.span`
    font-size: 14px;
    line-height: 18px;
    color: #001030;
    margin-top: 4px;
    text-decoration: none;
    word-break: break-all;
    width: fit-content;
`;

const SEntityNameMoreActionsIcon = styled.a`
    content: ${Out};
    width: 12px;
    height: 12px;
    margin-left: 5px;
`;

const SEntityTypeShortLabel = styled.span`
    font-size: 10px;
    color: #6d6f88;
`;

const SLeftSide = styled.div`
    width: 44px;
    height: 44px;
    background-color: rgba(0, 76, 255, 0.08);
    border-radius: 3px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    position: relative;
    margin-right: 24px;
`;

const SRightSide = styled.div`
    display: flex;
    flex: 2;
    max-width: 235px;
    flex-direction: column;
`;

const STagsWrapper = styled(Tags)`
    display: flex;
`;

const STechnicalLogo = styled.img`
    width: 24px;
`;

const SWrappedContainer = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
`;

const SRoot = styled.div`
    display: flex;
    flex-direction: column;
    color: #001030;
    overflow: hidden;
    max-height: 58px;
    transition: max-height 0.15s ease-out;

    ${(props) =>
        props.cardExpanded &&
        css`
            height: fit-content;
            max-height: 330px;
            transition: max-height 0.5s ease-in;
        `}

    ${(props) =>
        props.cursorPointer &&
        css`
            cursor: pointer;
        `}

    ${(props) =>
        props.entityPage &&
        css`
            padding: 18px;
            box-shadow: 0px 0px 2px 2px rgba(0, 76, 255, 0.08);

            ${SLeftSide} {
                width: 60px;
                height: 60px;
            }

            ${SEntityDGGlyphContainer} {
                width: 24px;
                height: 24px;
            }

            ${SEntityDGGlyph} {
                font-size: 20px;

                ${props.big &&
                css`
                    font-size: 32px;
                `}
            }

            ${STechnicalLogo} {
                width: 32px;
            }
        `}
`;

/* ---------- COMPONENT ---------- */

const LIMIT_TAGS_ELLIPSE = 3;

interface SearchCardResultProps {
    alwaysExpanded?: boolean;
    ellipseBreadCrumb?: number;
    entity: any;
    entityPage: boolean;
    onClick?: () => void;
}

const SearchCardResult: FC<SearchCardResultProps> = ({
    alwaysExpanded = false,
    ellipseBreadCrumb,
    entity,
    entityPage,
    onClick,
}) => {
    const [isCardExpanded, setIsCardExpanded] = useState(alwaysExpanded);
    const [isMoreActionShown, setIsMoreActionsShown] = useState(false);

    const isRootEntity = useMemo<boolean>(() => entity?.path === `\\${entity?.name}`, [entity]);
    const { kind, glyph } = entitiesTypeRelatedInfos[entity.type];

    // TODO : Link to API (Waiting for API feature)
    const isTechnicalLogo = true;

    return (
        <div>
            {entity && (
                <SRoot
                    cardExpanded={isCardExpanded}
                    cursorPointer={!!onClick}
                    entityPage={entityPage}
                    onClick={onClick}
                    onKeyPress={onClick}
                    onMouseEnter={() => alwaysExpanded || setIsCardExpanded(true)}
                    onMouseLeave={() => alwaysExpanded || setIsCardExpanded(false)}
                    role="button"
                    tabIndex={0}
                >
                    <SWrappedContainer>
                        <SLeftSide title={chrome.i18n.getMessage(`entity_label_full_${entity.type}`)}>
                            {isTechnicalLogo ? (
                                <>
                                    <STechnicalLogo alt="Technical Logo" src={TechnicalLogoPlaceholder} />
                                    <SEntityDGGlyphContainer>
                                        <SEntityDGGlyph icon={glyph} kind={kind.toLowerCase()} />
                                    </SEntityDGGlyphContainer>
                                </>
                            ) : (
                                <SEntityDGGlyph icon={glyph} kind={kind.toLowerCase()} big />
                            )}
                            {!entityPage && (
                                <SEntityTypeShortLabel>
                                    {chrome.i18n.getMessage(`entity_label_short_${entity.type}`)}
                                </SEntityTypeShortLabel>
                            )}
                        </SLeftSide>

                        <SRightSide>
                            {!isRootEntity && (
                                <SBreadcrumbWrapper>
                                    <Breadcrumb ellipse={ellipseBreadCrumb} path={entity.path} />
                                </SBreadcrumbWrapper>
                            )}
                            <SEntityName
                                onMouseEnter={() => setIsMoreActionsShown(true)}
                                onMouseLeave={() => setIsMoreActionsShown(false)}
                            >
                                {entity.name}
                                {isMoreActionShown && (
                                    /* eslint-disable jsx-a11y/control-has-associated-label, jsx-a11y/anchor-has-content */
                                    <SEntityNameMoreActionsIcon
                                        href={entity.objectUrl}
                                        rel="noreferrer"
                                        target="_blank"
                                    />
                                )}
                            </SEntityName>
                            <SInfosWrapper>
                                {entity.attributes?.status && (
                                    <>
                                        <Status status={entity.attributes?.status} hideLabel />
                                        <OwnersStewardsSeparator />
                                    </>
                                )}

                                {entity.attributes?.tags?.length > 0 && (
                                    <>
                                        <STagsWrapper>
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
                                                <SGlyph icon="Add" />
                                            )}
                                        </STagsWrapper>
                                        <OwnersStewardsSeparator />
                                    </>
                                )}

                                <SAssociatedUsersWrapper>
                                    {entity.owners && (
                                        <UserProfile governanceRole="owner" users={entity.owners} hideLabel />
                                    )}
                                    {entity.owners && <OwnersStewardsSeparator />}
                                    {entity.stewards && (
                                        <UserProfile governanceRole="steward" users={entity.stewards} />
                                    )}
                                </SAssociatedUsersWrapper>
                            </SInfosWrapper>
                        </SRightSide>
                    </SWrappedContainer>
                </SRoot>
            )}
        </div>
    );
};

export default SearchCardResult;
