import React, { useCallback } from 'react';
import { UserType } from 'shared';
import styled, { css } from 'styled-components';

/* ---------- STYLES ---------- */

const SPictureRoot = styled.img`
    border-radius: 50%;
    border: 1px solid #ffffff;
    vertical-align: middle;

    ${(props) =>
        props.grouped &&
        css`
            margin-right: -5px;
        `}

    ${(props) =>
        props.size === 'normal' &&
        css`
            width: 30px;
            height: 30px;
            border-width: 2px;
        `}

    ${(props) =>
        props.size === 'mini' &&
        css`
            width: 20px;
            height: 20px;
            border-width: 1px;
            font-size: 10px !important;
        `}
`;

const SNoPictureRoot = styled(SPictureRoot)`
    font-size: 14px;
    color: #ffffff;
    display: flex;
    justify-content: center;
    align-items: center;
`;

/* ---------- COMPONENT ---------- */

export enum CustomColors {
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

    OrangeD = '#CB4800',
    OrangeM = '#E57400',
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

const Avatar = ({
    grouped = false,
    user,
    size = 'normal',
}: {
    grouped?: boolean;
    user?: UserType;
    size?: 'normal' | 'mini';
}) => {
    const getColor = useCallback(() => {
        switch (user.firstName[0]) {
            case 'a':
            case 's':
                return CustomColors.OrangeD;
            case 'b':
            case 't':
                return CustomColors.OrangeM;
            case 'c':
            case 'u':
                return CustomColors.OrangeL;
            case 'd':
            case 'v':
                return CustomColors.RedD;
            case 'e':
            case 'w':
                return CustomColors.RedM;
            case 'f':
            case 'x':
                return CustomColors.RedL;
            case 'g':
            case 'y':
                return CustomColors.PinkD;
            case 'h':
            case 'z':
                return CustomColors.PinkM;
            case 'i':
            case '1':
                return CustomColors.PinkL;
            case 'j':
            case '2':
                return CustomColors.PurpleD;
            case 'k':
            case '3':
                return CustomColors.PurpleM;
            case 'l':
            case '4':
                return CustomColors.PurpleL;
            case 'm':
            case '5':
                return CustomColors.BlueD;
            case 'n':
            case '6':
                return CustomColors.BlueM;
            case 'o':
            case '7':
                return CustomColors.BlueL;
            case 'p':
            case '8':
                return CustomColors.GreenD;
            case 'q':
            case '9':
                return CustomColors.GreenM;
            case 'r':
            case '0':
                return CustomColors.GreenL;
            default:
                return CustomColors.OrangeD;
        }
    }, [user]);

    if (!user) {
        return null;
    }

    if (!user.profileThumbnailUrl) {
        return (
            <SNoPictureRoot
                as="div"
                grouped={grouped}
                size={size}
                style={{ backgroundColor: getColor() }}
            >{`${user.firstName[0]}${user.lastName[0]}`}</SNoPictureRoot>
        );
    }

    return (
        <div title={`${user.firstName}. ${user.lastName}`}>
            <SPictureRoot
                alt={`${user.firstName}. ${user.lastName}`}
                grouped={grouped}
                size={size}
                src={user.profileThumbnailUrl}
            />
        </div>
    );
};

export default Avatar;
