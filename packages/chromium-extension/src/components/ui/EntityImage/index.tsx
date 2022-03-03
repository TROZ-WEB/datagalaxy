import React, { FC } from 'react';
import { entitiesTypeRelatedInfos } from 'shared';
import styled, { css } from 'styled-components';
import Glyph from '../Glyph';
import TechnicalLogoPlaceholder from '../../../../assets/technical-logo-placeholder.png';

/* ---------- STYLES ---------- */

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

const SEntityTypeShortLabel = styled.span`
    font-size: 10px;
    color: #6d6f88;
`;

const STechnicalLogo = styled.img`
    width: 24px;
`;

const SRoot = styled.div`
    width: 44px;
    height: 44px;
    background-color: rgba(246, 247, 248, 1);
    border-radius: 3px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    position: relative;
    margin-right: 24px;

    ${(props) =>
        props.entityPage &&
        css`
            width: 60px;
            height: 60px;

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
                width: 42px;
            }
        `}
`;

/* ---------- COMPONENT ---------- */

interface EntityHeaderProps {
    entity: any;
    entityPage?: boolean;
}

const EntityImage: FC<EntityHeaderProps> = ({ entity, entityPage }) => {
    const { kind, glyph } = entitiesTypeRelatedInfos[entity.type];

    // TODO : Link to API (Waiting for API feature)
    const isTechnicalLogo = true;

    return (
        <SRoot entityPage={entityPage} title={chrome.i18n.getMessage(`entity_label_full_${entity.type}`)}>
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
        </SRoot>
    );
};

export default EntityImage;
