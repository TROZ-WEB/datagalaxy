import React, { FC } from 'react';
import { entitiesTypeRelatedInfos, EntityType } from 'shared';
import styled, { css } from 'styled-components';
import Glyph from './Glyph';

/* ---------- STYLES ---------- */

const SDomainName = styled.span`
    font-size: 12px;
    color: #001030;
    text-decoration: none;
    word-break: break-all;
    width: fit-content;
    margin-left: 5px;
`;

const SRightSide = styled.div`
    display: flex;
    flex: 2;
    max-width: 235px;
    flex-direction: column;
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
    border-radius: 5px;
    padding: 0 6px;
    margin: 2px 2px 2px 3px;
    overflow: visible;
    min-height: 24px;
    background-color: #fff !important;
    color: #001030 !important;
    border: 1px solid #ddd;
    box-shadow: none;
    font-size: 16px;

    ${(props) =>
        props.cursorPointer &&
        css`
            cursor: pointer;
        `}
`;

const SEntityDGGlyph = styled(Glyph)`
    font-size: 16px;

    ${(props) =>
        props.kind === 'catalog' &&
        css`
            color: #28aae2;
            fill: #28aae2;
        `}

    ${(props) =>
        props.kind === 'processing' &&
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
        props.kind === 'usage' &&
        css`
            color: #12884b;
            fill: #12884b;
        `}

    ${(props) => props.big && 'font-size: 24px'}
`;

/* ---------- COMPONENT ---------- */

interface DomainCardProps {
    entity: EntityType;
    onClick?: () => void;
}

const DomainCard: FC<DomainCardProps> = ({ entity, onClick }) => {
    const { glyph, kind } = entitiesTypeRelatedInfos[entity.type];

    return (
        <div>
            {entity && (
                <SRoot
                    cursorPointer={!!onClick}
                    onClick={() => onClick()}
                    onKeyPress={() => onClick()}
                    role="button"
                    tabIndex={0}
                >
                    <SWrappedContainer>
                        <SEntityDGGlyph icon={glyph} kind={kind.toLowerCase()} big />
                        <SRightSide>
                            <SDomainName>{entity.name}</SDomainName>
                        </SRightSide>
                    </SWrappedContainer>
                </SRoot>
            )}
        </div>
    );
};

export default DomainCard;
