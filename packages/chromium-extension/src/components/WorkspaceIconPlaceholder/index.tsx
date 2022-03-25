import React, { useEffect, useState } from 'react';

import styled from 'styled-components';

const SWorkspacePlacerHolder = styled.div`
    height: 16px;
    width: 16px;
    border-radius: 3px;
    font-size: 7px;
    font-weight: 700;
    color: white;
    display: flex;
    align-items: center;
    justify-content: center;
    ${(props) => `
        background-color: ${props.color};
   `}
`;

enum CustomColors {
    White = 'white',

    BlueGreen = '#00a99d',
    Green = '#8cc63f',
    Orange = '#f7931e',
    Pink = '#d4145a',
    LightBlue = '#29abe2',
    Blue = '#0971b7',
    DarkBlue = '#1e2437',
    DarkGrey = '#808595',
    LightGrey = '#b7bdcb',

    BrownD = '#3E2723',
    BrownM = '#753627',
    BrownL = '#D38C6C',

    // OrangeD="#E02F00",
    OrangeD = '#CB4800',
    OrangeM = '#E57400',
    // OrangeL="#FFA931",
    OrangeL = '#F1A600',

    RedD = '#7D0000',
    RedM = '#D30027',
    RedL = '#FC6565',

    PinkD = '#841052',
    PinkM = '#E01882',
    PinkL = '#F074C0',

    PurpleD = '#4A148C',
    PurpleM = '#761FDE',
    PurpleL = '#B98BEF',

    BlueD = '#1A237E',
    BlueM = '#404ED7',
    BlueL = '#3FA9F5',

    GreenD = '#006837',
    GreenM = '#009245',
    GreenL = '#8CC63F',

    BlueGrayD = '#263238',
    BlueGrayM = '#577F92',
    BlueGrayL = '#6EB3D4',

    GrayD = '#212121',
    GrayM = '#616161',
    GrayL = '#90A4AE',
}

const getBackgroundColor = (firstLetter) => {
    switch (firstLetter) {
        case 'a':
        case 's':
            return 'OrangeD';
        case 'b':
        case 't':
            return 'OrangeM';
        case 'c':
        case 'u':
            return 'OrangeL';
        case 'd':
        case 'v':
            return 'RedD';
        case 'e':
        case 'w':
            return 'RedM';
        case 'f':
        case 'x':
            return 'RedL';
        case 'g':
        case 'y':
            return 'PinkD';
        case 'h':
        case 'z':
            return 'PinkM';
        case 'i':
        case '1':
            return 'PinkL';
        case 'j':
        case '2':
            return 'PurpleD';
        case 'k':
        case '3':
            return 'PurpleM';
        case 'l':
        case '4':
            return 'PurpleL';
        case 'm':
        case '5':
            return 'BlueD';
        case 'n':
        case '6':
            return 'BlueM';
        case 'o':
        case '7':
            return 'BlueL';
        case 'p':
        case '8':
            return 'GreenD';
        case 'q':
        case '9':
            return 'GreenM';
        case 'r':
        case '0':
            return 'GreenL';
        default:
            return 'OrangeD';
    }
};

const WorkspacePlaceHolder = ({ workspaceTrigram }: { workspaceTrigram: string }) => {
    const [color, setColor] = useState<string>();
    const [formattedTrigram, setFormattedTrigram] = useState<string>();

    useEffect(() => {
        if (workspaceTrigram) {
            const c = getBackgroundColor(workspaceTrigram?.charAt(0));
            setColor(c);
            const trigramSplitted = workspaceTrigram.split('');

            trigramSplitted[1] = trigramSplitted[1].toLowerCase();

            setFormattedTrigram(trigramSplitted.join(''));
        }
    }, [workspaceTrigram]);

    return <SWorkspacePlacerHolder color={CustomColors[color]}>{formattedTrigram}</SWorkspacePlacerHolder>;
};

export default WorkspacePlaceHolder;
