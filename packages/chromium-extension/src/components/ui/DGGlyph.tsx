import React, { FC } from 'react';
import styled, { css } from 'styled-components';
import Glyph from './Glyph';

/* ---------- STYLES ---------- */

const SEntityDGGlyph = styled(Glyph)`
    ${(props) => props.size === 'S' && `font-size: 16px;`}
    ${(props) => props.size === 'M' && `font-size: 20px;`}
    ${(props) => props.size === 'L' && `font-size: 24px;`}
    ${(props) => props.size === 'XL' && `font-size: 32px;`}

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

interface DGGlyphProps {
    icon: string;
    kind: string;
    className?: string;
    tooltip?: string;
    size?: 'S' | 'M' | 'L' | 'XL';
}

const DGGlyph: FC<DGGlyphProps> = ({ size = 'S', className, tooltip, icon, kind }) => {
    return (
        // eslint-disable-next-line react/jsx-no-useless-fragment
        <>
            {kind && icon && (
                <SEntityDGGlyph className={className} data-tip={tooltip} icon={icon} kind={kind} size={size} />
            )}
        </>
    );
};

export default DGGlyph;
