import React, { FC } from 'react';
import styled from 'styled-components';
import glyphList from './glyphList';

/* ---------- STYLES ---------- */

const SGlyph = styled.span`
    font-family: 'datagalaxy' !important;
    font-style: normal;
    font-weight: 400;
    font-variant: normal;
    text-transform: none;
    line-height: 1;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;

    &::before {
        content: '\\${(props) => glyphList[props.icon]}';
    }
`;

const SRoot = styled.div`
    color: inherit;
    font-size: 18px;
    line-height: 0%;
`;

/* ---------- COMPONENT ---------- */

interface GlyphProps {
    icon: string;
    className?: string;
}

const Glyph: FC<GlyphProps> = ({ icon, className }) => {
    return (
        <SRoot className={className}>
            <SGlyph icon={icon} />
        </SRoot>
    );
};

export default Glyph;
