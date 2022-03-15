import React, { FC } from 'react';
import { entitiesTypeRelatedInfos } from 'shared';
import styled, { css } from 'styled-components';
import DGGlyph from './DGGlyph';
import TechnicalLogoPlaceholder from '../../../assets/technical-logo-placeholder.png';
/* ---------- STYLES ---------- */

const SEntityDGGlyphContainer = styled.div`
    position: absolute;
    background-color: #ffffff;
    width: 18px;
    height: 18px;
    top: 50%;
    right: 2%;
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
    min-width: 44px;
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
            min-width: 60px;

            ${SEntityDGGlyphContainer} {
                width: 24px;
                height: 24px;
            }

            ${STechnicalLogo} {
                width: 42px;
            }
        `}
`;

/* ---------- COMPONENT ---------- */

interface EntityImageProps {
    entity: any;
    entityPage?: boolean;
}

const EntityImage: FC<EntityImageProps> = ({ entity, entityPage }) => {
    const { kind, glyph } = entitiesTypeRelatedInfos[entity.type];

    // TODO : Link to API (Waiting for API feature)
    const isTechnicalLogo = true;

    return (
        <SRoot entityPage={entityPage} title={chrome.i18n.getMessage(`entity_label_full_${entity.type}`)}>
            {isTechnicalLogo ? (
                <>
                    <STechnicalLogo alt="Technical Logo" src={TechnicalLogoPlaceholder} />
                    <SEntityDGGlyphContainer>
                        <DGGlyph icon={glyph} kind={kind.toLowerCase()} size={entityPage ? 'M' : 'S'} />
                    </SEntityDGGlyphContainer>
                </>
            ) : (
                <DGGlyph icon={glyph} kind={kind.toLowerCase()} size={entityPage ? 'XL' : 'L'} />
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
