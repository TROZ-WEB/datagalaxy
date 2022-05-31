import { createGlobalStyle } from 'styled-components';
import DatagalaxyGlyphEOT from '../assets/fonts/datagalaxy.eot';
import DatagalaxyGlyphTTF from '../assets/fonts/datagalaxy.ttf';
import DatagalaxyGlyphWOFF from '../assets/fonts/datagalaxy.woff';
import DatagalaxyGlyphSVG from '../assets/fonts/datagalaxy.svg';

export const Theme = {
    menuBarHeight: '63px',

    white: '#ffffff',
    black: '#001030',
    grey: '#6D6F88',
    reflex: '#1035b1',
    paleReflex: '#F3F6FF',
    electricBlue: '#084eff',

    text: '#333333',

    catalog: '#28aae2',
    processing: '#1035b1',
    glossary: '#50c516',
    usage: '#12884b',

    warning: '#cd3835',
    success: '#155724',

    transGrey: 'rgba(0, 76, 255, 0.08)',
    transReflex: 'rgba(2, 42, 142, 0.1)',

    linearGradient: 'linear-gradient(71.97deg, #001aff 11.94%, #084eff 37.82%, #17aeff 85.88%)',
    linearGradientHover: 'linear-gradient(90deg, #0016d7, #0297e6)',

    boxShadow: '0px 0px 14px rgb(16 53 177 / 12%)',

    mediumGrayColor: '#5a5e86',
    orangeColor: '#ff811a',
    blueColor: '#28aae2',
    greenColor: '#50c516',
    magentaColor: '#ca004a',
    functionalColor: '#50c516',
    technicalColor: '#28aae2',
};

export const Fonts = createGlobalStyle`
    @font-face {
        font-family: 'datagalaxy';
        src: url(${DatagalaxyGlyphEOT}) format('embedded-opentype'),
            url(${DatagalaxyGlyphTTF}) format('truetype'),
            url(${DatagalaxyGlyphWOFF}) format('woff'),
            url(${DatagalaxyGlyphSVG}) format('svg');
        font-weight: 400;
        font-style: normal;
        font-display: block;
    }
`;

export const GlobalStyle = createGlobalStyle`
    h1, h2, h3, h4, h4, h6 {
        margin: 0;
    }

    ::-webkit-scrollbar-track {
        background-color: #fff;
        box-shadow: none;
        border-radius: 0
    }

    ::-webkit-scrollbar-thumb {
        background-image: linear-gradient(100deg,#ecf2ff,#ecf2ff)!important;
        border-radius: 7px;
        border: 4px solid #fff
    }

    ::-webkit-scrollbar-thumb:hover {
        background-image: linear-gradient(100deg,#1035b1,#1035b1)!important
    }

    ::-webkit-scrollbar {
        width: 14px
    }
`;
