import React, { useState, useMemo, FC, useEffect } from 'react';
import { ExactMatch } from 'shared';
import styled, { css } from 'styled-components';
import Breadcrumb from '../Breadcrumb';
import Status from '../Entity/Status';
import UsersProfile from '../Entity/UsersProfile';
import OwnersStewardsSeparator from '../OwnersStewardsSeparator';
import EntityImage from './EntityImage';
import ArrowDrop from '../../../assets/icons/arrow-drop-up.svg';
import Out from '../../../assets/icons/out.svg';

/* ---------- STYLES ---------- */

const SAssociatedUsersWrapper = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
`;

const SBreadcrumbWrapper = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    min-height: 19px;
`;

const SInfosWrapper = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    margin-top: 5px;
`;

const SEntityName = styled.span`
    font-size: 12px;
    color: #001030;
    text-decoration: none;
    word-break: break-all;
    width: fit-content;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    max-width: 75%;
`;

const SEntityNameMoreActionsIcon = styled.a`
    content: ${Out};
    width: 12px;
    height: 12px;
    margin-left: 5px;
`;

const SRightSide = styled.div`
    display: flex;
    flex-direction: column;
    width: 100%;
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
    transition: max-height 0.15s ease-out;
    position: relative;
    z-index: 15;
    height: 64px;

    ${(props) =>
        props.cardExpanded &&
        css`
            height: fit-content;
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
            padding: 18px 18px 14px 18px;
            box-shadow: 0px 0px 14px rgba(16, 53, 177, 0.12);

            ${SEntityName} {
                font-size: 16px;
                font-weight: 700;
            }
        `}
`;

const SAttributeKey = styled.span`
    color: #2142b6;
    font-size: 10px;
    font-weight: bold;
    min-width: fit-content;
`;

const SMatchString = styled.span`
    font-weight: bold;
    font-size: 10px;
    white-space: nowrap;
    margin-left: 4px;
    overflow: hidden;
    text-overflow: ellipsis;
`;

const SAttributeContainer = styled.div`
    display: ${(props) => (props.hidden ? 'none' : 'flex')};
    align-items: center;
    vertical-align: middle;
    height: 20px;
`;

const SDisplayMoreAttributesButton = styled.button`
    justify-content: center;
    border: none;
    border-radius: 8px;
    padding-top: 3px;
    padding-bottom: 3px;
    font-size: 8px;
    background: white;
    margin-left: 8px;
    color: #1035b1;
    min-width: 30px;
    cursor: pointer;
    display: flex;
    align-items: center;
    box-shadow: rgb(0 0 0 / 16%) 0px 1px 4px;
`;

const SDrop = styled.img`
    width: 10px;
    height: 10px;

    ${(props) =>
        props.arrowDropDown &&
        css`
            transform: rotate(180deg);
        `}
`;

const SType = styled.span`
    font-size: 12px;
`;

/* ---------- COMPONENT ---------- */

interface EntityHeaderProps {
    id: string;
    alwaysExpanded?: boolean;
    entity: any;
    entityPage?: boolean;
    onClick?: () => void;
    exactMatches?: ExactMatch[];
    searchQuery?: string;
}

const EntityHeader: FC<EntityHeaderProps> = ({
    id,
    alwaysExpanded = false,
    entity,
    entityPage,
    onClick,
    exactMatches,
    searchQuery,
}) => {
    const [isCardExpanded, setIsCardExpanded] = useState(alwaysExpanded);
    const [isMoreActionShown, setIsMoreActionsShown] = useState(false);
    const [displayMoreAttributes, setDisplayMoreAttributes] = useState(false);

    const isRootEntity = useMemo<boolean>(() => entity?.path === `\\${entity?.name}`, [entity]);

    const [entityPathAsString, setEntityPathAsString] = useState();

    useEffect(() => {
        const pathAsString = entity?.path?.trim().split('\\').slice(0, -1).filter(Boolean);
        if (!entityPage) {
            pathAsString.shift(); // remove workspace part
        }
        setEntityPathAsString(pathAsString);
    }, [entity]);

    return (
        // eslint-disable-next-line react/jsx-no-useless-fragment
        <>
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
                                    <Breadcrumb path={entityPathAsString} />
                                </SBreadcrumbWrapper>
                            )}
                            <SEntityName
                                onMouseEnter={() => setIsMoreActionsShown(true)}
                                onMouseLeave={() => setIsMoreActionsShown(false)}
                                title={entity.name}
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
                            {exactMatches?.length !== 0 &&
                                exactMatches?.map((exactMatch, index, array) => {
                                    return (
                                        /* eslint-disable-next-line react/no-array-index-key */
                                        <SAttributeContainer key={index} hidden={index !== 0 && !displayMoreAttributes}>
                                            <SAttributeKey>
                                                {chrome.i18n.getMessage(`attribute_key_${exactMatch.attributeKey}`)
                                                    ? `${chrome.i18n.getMessage(
                                                          `attribute_key_${exactMatch.attributeKey}`,
                                                      )} : `
                                                    : `${exactMatch.attributeKey} : `}
                                            </SAttributeKey>
                                            <SMatchString>{searchQuery}</SMatchString>
                                            {index === 0 && exactMatches.length > 1 && !displayMoreAttributes && (
                                                <SDisplayMoreAttributesButton
                                                    onClick={(e) => {
                                                        e.stopPropagation();
                                                        setDisplayMoreAttributes(true);
                                                    }}
                                                    type="button"
                                                >
                                                    {`+ ${exactMatches.length - 1 >= 2 ? 2 : exactMatches.length - 1}`}
                                                    <SDrop alt="Arrow icon" src={ArrowDrop} arrowDropDown />
                                                </SDisplayMoreAttributesButton>
                                            )}
                                            {index === array.length - 1 &&
                                                exactMatches.length > 1 &&
                                                displayMoreAttributes && (
                                                    <SDisplayMoreAttributesButton
                                                        onClick={(e) => {
                                                            e.stopPropagation();
                                                            setDisplayMoreAttributes(false);
                                                        }}
                                                        type="button"
                                                    >
                                                        <SDrop alt="Arrow icon" arrowDropDown={false} src={ArrowDrop} />
                                                    </SDisplayMoreAttributesButton>
                                                )}
                                        </SAttributeContainer>
                                    );
                                })}
                            {entityPage && (
                                <SInfosWrapper>
                                    {entity.type && (
                                        <>
                                            <SType>{chrome.i18n.getMessage(`entity_type_${entity.type}`)}</SType>
                                            <OwnersStewardsSeparator />
                                        </>
                                    )}

                                    {entity.attributes?.status && (
                                        <>
                                            <Status status={entity.attributes?.status} />
                                            <OwnersStewardsSeparator />
                                        </>
                                    )}

                                    <SAssociatedUsersWrapper>
                                        {entity.owners && (
                                            <UsersProfile governanceRole="owner" users={entity.owners} hideLabel />
                                        )}
                                        {entity.owners && <OwnersStewardsSeparator />}
                                        {entity.stewards && (
                                            <UsersProfile governanceRole="steward" users={entity.stewards} hideLabel />
                                        )}
                                    </SAssociatedUsersWrapper>
                                </SInfosWrapper>
                            )}
                        </SRightSide>
                    </SWrappedContainer>
                </SRoot>
            )}
        </>
    );
};

export default EntityHeader;
