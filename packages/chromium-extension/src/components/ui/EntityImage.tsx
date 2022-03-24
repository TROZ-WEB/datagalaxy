import React, { FC, useState } from 'react';
import { entitiesTypeRelatedInfos } from 'shared';
import styled, { css } from 'styled-components';
import { useStoreState } from '../../store/hooks';
import DGGlyph from './DGGlyph';

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
    font-size: 8px;
    color: #6d6f88;
    margin-top: 2px;
    margin-bottom: -2px;
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
    const kind = entitiesTypeRelatedInfos?.[entity.type]?.kind;
    const glyph = entitiesTypeRelatedInfos?.[entity.type]?.glyph;

    const url = useStoreState((state) => state.auth.pubapi);

    const hasTechnicalLogo = entity.technology?.imageHash;

    const [errorLoadingImage, setErrorLoadingImage] = useState(false);

    return (
        <SRoot entityPage={entityPage} title={chrome.i18n.getMessage(`entity_label_full_${entity.type}`)}>
            {!errorLoadingImage && hasTechnicalLogo ? (
                <>
                    <STechnicalLogo
                        alt="Technical Logo"
                        onError={() => {
                            setErrorLoadingImage(true);
                        }}
                        src={`${url}/image?hash=${encodeURIComponent(entity.technology.imageHash)}`}
                    />
                    <SEntityDGGlyphContainer>
                        <DGGlyph icon={glyph} kind={kind?.toLowerCase()} size={entityPage ? 'M' : 'S'} />
                    </SEntityDGGlyphContainer>
                </>
            ) : (
                <DGGlyph icon={glyph} kind={kind?.toLowerCase()} size={entityPage ? 'XL' : 'L'} />
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
