import React, { useState, useMemo, FC } from 'react';
import styled, { css } from 'styled-components';
import Breadcrumb from '../../Breadcrumb';
import Status from '../../Entity/Status';
import Tags from '../../Entity/Tags';
import UsersProfile from '../../Entity/UsersProfile';
import OwnersStewardsSeparator from '../../OwnersStewardsSeparator';
import EntityImage from '../EntityImage';
import Glyph from '../Glyph';
import Out from '../../../../assets/icons/out.svg';

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

const SEntityName = styled.span`
    font-size: 12px;
    color: #001030;
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

const SRightSide = styled.div`
    display: flex;
    flex: 2;
    max-width: 235px;
    flex-direction: column;
`;

const STagsWrapper = styled(Tags)`
    display: flex;
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
    position: relative;
    z-index: 15;

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

            ${SEntityName} {
                font-size: 16px;
                font-weight: 700;
            }
        `}
`;

/* ---------- COMPONENT ---------- */

const LIMIT_TAGS_ELLIPSE = 3;

interface EntityHeaderProps {
    id: string;
    alwaysExpanded?: boolean;
    entity: any;
    entityPage?: boolean;
    onClick?: () => void;
}

const EntityHeader: FC<EntityHeaderProps> = ({ id, alwaysExpanded = false, entity, entityPage, onClick }) => {
    const [isCardExpanded, setIsCardExpanded] = useState(alwaysExpanded);
    const [isMoreActionShown, setIsMoreActionsShown] = useState(false);

    const isRootEntity = useMemo<boolean>(() => entity?.path === `\\${entity?.name}`, [entity]);

    return (
        <div>
            {entity && (
                <SRoot
                    cardExpanded={isCardExpanded}
                    cursorPointer={!!onClick}
                    entityPage={entityPage}
                    id={id}
                    onClick={onClick}
                    onKeyPress={onClick}
                    onMouseEnter={() => alwaysExpanded || setIsCardExpanded(true)}
                    onMouseLeave={() => alwaysExpanded || setIsCardExpanded(false)}
                    role="button"
                    tabIndex={0}
                >
                    <SWrappedContainer>
                        <EntityImage entity={entity} entityPage={entityPage} />

                        <SRightSide>
                            {!isRootEntity && (
                                <SBreadcrumbWrapper>
                                    <Breadcrumb path={entity.path} />
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
                            {entityPage && (
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
                                            <UsersProfile governanceRole="owner" users={entity.owners} hideLabel />
                                        )}
                                        {entity.owners && <OwnersStewardsSeparator />}
                                        {entity.stewards && (
                                            <UsersProfile governanceRole="steward" users={entity.stewards} />
                                        )}
                                    </SAssociatedUsersWrapper>
                                </SInfosWrapper>
                            )}
                        </SRightSide>
                    </SWrappedContainer>
                </SRoot>
            )}
        </div>
    );
};

export default EntityHeader;
