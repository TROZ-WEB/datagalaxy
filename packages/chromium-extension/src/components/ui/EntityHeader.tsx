import React, { useState, FC, useEffect, useRef } from 'react';
import { AttributeDefinitionType, Workspace } from 'shared';
import styled, { css } from 'styled-components';
import { useStoreState } from '../../store/hooks';
import { Theme } from '../../Theme';
import { isEllipsis } from '../../utils';
import Breadcrumb from '../Breadcrumb';
import Status from '../Entity/Status';
import UsersProfile from '../Entity/UsersProfile';
import EntityImage from './EntityImage';
import VerticalSeparator from './VerticalSeparator';
import ArrowDrop from '../../../assets/icons/arrow-drop-up.svg';
import Out from '../../../assets/icons/out.svg';

/* ---------- STYLES ---------- */

const SAssociatedUsersWrapper = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
`;

const SBreadcrumbWrapper = styled.div<{ $entityPage: boolean }>`
    display: flex;
    flex-direction: row;
    align-items: center;
    ${(props) =>
        props.$entityPage &&
        css`
            min-height: 19px;
        `}
`;

const SInfosWrapper = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    margin-top: 5px;
`;

const SEntityName = styled.span<{ $bold: boolean; $maxWidth: number }>`
    font-size: 12px;
    color: #001030;
    text-decoration: none;
    max-width: ${(props) => props.$maxWidth}px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    margin-top: 4px;

    ${(props) =>
        props.$bold &&
        css`
            font-weight: bold;
        `}
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

const SRoot = styled.div<{ $entityPage: boolean; $cursorPointer: boolean }>`
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    color: ${Theme.black};
    overflow: hidden;
    transition: max-height 0.15s ease-out;
    position: relative;
    z-index: 15;

    ${(props) =>
        props.$cursorPointer &&
        css`
            cursor: pointer;
        `}

    ${(props) =>
        props.$entityPage &&
        css`
            padding: 0px 18px;
            box-shadow: ${Theme.boxShadow};
            height: 100px;
            box-sizing: border-box;

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
    color: ${Theme.reflex};
    min-width: 30px;
    cursor: pointer;
    display: flex;
    align-items: center;
    box-shadow: rgb(0 0 0 / 16%) 0px 1px 4px;
`;

const SDrop = styled.img<{ $arrowDropDown: boolean }>`
    width: 10px;
    height: 10px;

    ${(props) =>
        props.$arrowDropDown &&
        css`
            transform: rotate(180deg);
        `}
`;

const SStatus = styled(Status)`
    padding: 2px;
    margin: 5px 0;
`;

const SType = styled.span`
    font-size: 12px;
    max-width: 70px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
`;

/* ---------- COMPONENT ---------- */

interface EntityHeaderProps {
    id: string;
    alwaysExpanded?: boolean;
    entity: any;
    entityPage?: boolean;
    onClick?: () => void;
    exactMatches?: AttributeDefinitionType[];
    searchQuery?: string;
    displayPath?: boolean;
    currentWorkspace?: string;
    maxWidth?: number;
}

const EntityHeader: FC<EntityHeaderProps> = ({
    id,
    alwaysExpanded = false,
    entity,
    entityPage,
    onClick,
    exactMatches,
    searchQuery,
    displayPath = true,
    currentWorkspace,
    maxWidth = 280,
}) => {
    const [isMoreActionShown, setIsMoreActionsShown] = useState(false);
    const [displayMoreAttributes, setDisplayMoreAttributes] = useState(false);

    const [entityPathAsStringArray, setEntityPathAsStringArray] = useState<string[]>([]);

    const workspaces = useStoreState((state) => state.auth.workspaces);

    const [workspace, setWorkspace] = useState<Workspace>();

    const entityNameRef = useRef<HTMLSpanElement>(null);

    useEffect(() => {
        if (entity && displayPath && entity?.path) {
            const pathAsStringArray = entity?.path?.trim().split('\\').slice(0, -1).filter(Boolean);
            if (currentWorkspace) {
                pathAsStringArray.unshift(currentWorkspace);
            }

            const workspaceName = pathAsStringArray[0];
            const workspaceResult = workspaces.find((w) => workspaceName === w.name);
            setWorkspace(workspaceResult);

            pathAsStringArray.shift(); // remove workspace part

            setEntityPathAsStringArray(pathAsStringArray);
        }
    }, [entity, workspaces, displayPath]);

    const sTypeRef = useRef<HTMLSpanElement>();

    const [propsForType, setPropsForType] = useState({});

    useEffect(() => {
        if (sTypeRef.current) {
            if (sTypeRef.current.offsetWidth < sTypeRef.current.scrollWidth) {
                setPropsForType({ 'data-tip': chrome.i18n.getMessage(`entity_label_full_${entity.type}`) });
            } else {
                setPropsForType({});
            }
        }
    }, [sTypeRef.current]);

    return (
        // eslint-disable-next-line react/jsx-no-useless-fragment
        <>
            {entity && entity?.path && (
                <SRoot
                    $cursorPointer={!!onClick}
                    $entityPage={entityPage}
                    id={id}
                    onClick={onClick}
                    onKeyPress={onClick}
                    onMouseEnter={() => alwaysExpanded}
                    onMouseLeave={() => alwaysExpanded}
                    role="button"
                    tabIndex={0}
                >
                    <SWrappedContainer>
                        <EntityImage entity={entity} entityPage={entityPage} showTooltip={!entityPage} />

                        <SRightSide>
                            {displayPath && (
                                <SBreadcrumbWrapper $entityPage={entityPage}>
                                    <Breadcrumb path={entityPathAsStringArray} workspace={workspace} />
                                </SBreadcrumbWrapper>
                            )}
                            <SEntityName
                                ref={entityNameRef}
                                $bold={entity.exactMatchOccuredOnName}
                                $maxWidth={maxWidth}
                                data-tip={isEllipsis(entityNameRef.current) ? entity.name : undefined}
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
                            {exactMatches?.length !== 0 &&
                                exactMatches?.map((exactMatch, index, array) => (
                                    /* eslint-disable-next-line react/no-array-index-key */
                                    <SAttributeContainer key={index} hidden={index !== 0 && !displayMoreAttributes}>
                                        <SAttributeKey>
                                            {chrome.i18n.getMessage(`attribute_key_${exactMatch.attributeKey}`)
                                                ? `${chrome.i18n.getMessage(
                                                      `attribute_key_${exactMatch.attributeKey}`,
                                                  )} : `
                                                : `${exactMatch.name || exactMatch.attributeKey} : `}
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
                                                <SDrop alt="Arrow icon" src={ArrowDrop} $arrowDropDown />
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
                                                    <SDrop $arrowDropDown={false} alt="Arrow icon" src={ArrowDrop} />
                                                </SDisplayMoreAttributesButton>
                                            )}
                                    </SAttributeContainer>
                                ))}
                            {entityPage && (
                                <SInfosWrapper>
                                    {entity.type && (
                                        <>
                                            <SType {...propsForType} ref={sTypeRef}>
                                                {chrome.i18n.getMessage(`entity_label_full_${entity.type}`)}
                                            </SType>
                                            <VerticalSeparator />
                                        </>
                                    )}

                                    {entity.attributes?.status && (
                                        <SStatus status={entity.attributes?.status} hideLabel />
                                    )}

                                    <SAssociatedUsersWrapper>
                                        {entity.owners && (
                                            <>
                                                <VerticalSeparator />
                                                <UsersProfile governanceRole="owner" users={entity.owners} />
                                            </>
                                        )}
                                        {entity.stewards && (
                                            <>
                                                <VerticalSeparator />
                                                <UsersProfile governanceRole="steward" users={entity.stewards} />{' '}
                                            </>
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
