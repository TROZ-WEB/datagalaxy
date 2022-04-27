import React, { useMemo } from 'react';
import { UserType } from 'shared';
import styled from 'styled-components';
import Avatar from '../../Avatar';
import Tooltip from '../../ui/Tooltip';

/* ---------- STYLES ---------- */

const SAvatarWrapper = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
`;

const SRoot = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
`;

const SNumberOfUsers = styled.div`
    color: #1035b1;
    font-size: 10px;
    margin-left: 2px;
    background: #f3f6ff;
    padding: 2px;
    border-radius: 3px;
    font-weight: bold;
`;

const TooltipRoot = styled.div`
    display: flex;
    flex-direction: column;
`;

const TooltipHeader = styled.div`
    font-weight: bold;
    opacity: 0.5;
`;

const TooltipContent = styled.div`
    margin-top: 3px;
    font-weight: normal;
`;

interface OtherUsersInformations {
    header: string;
    informations: string;
}

/* ---------- COMPONENT ---------- */

const LIMIT_AVATAR_ELLIPSE = 2;

const UsersProfile = ({ governanceRole, users }: { governanceRole?: 'owner' | 'steward'; users: UserType[] }) => {
    const usersToDisplay = users.slice(0, LIMIT_AVATAR_ELLIPSE);
    const otherUsers = users.slice(LIMIT_AVATAR_ELLIPSE, users.length);

    const otherUsersInformations: OtherUsersInformations = useMemo(() => {
        const header = chrome.i18n.getMessage(`entity_${governanceRole}s`);
        let informations = '';
        otherUsers?.forEach((user, index, array) => {
            informations += `${user.firstName} ${user.lastName} ${index === array.length - 1 ? '' : ','} `;
        });

        return {
            header,
            informations,
        };
    }, [otherUsers]);

    return (
        <SRoot>
            <SAvatarWrapper>
                {usersToDisplay?.map(
                    (user, index) =>
                        user && (
                            <Avatar
                                key={user?.userId}
                                grouped={usersToDisplay?.length > 1 && index !== usersToDisplay?.length - 1}
                                role={governanceRole}
                                size="mini"
                                user={user}
                            />
                        ),
                )}
            </SAvatarWrapper>
            {users?.length > LIMIT_AVATAR_ELLIPSE && (
                <SNumberOfUsers>
                    <span data-for="otherUsersInformations" data-tip>{`+${users.length - LIMIT_AVATAR_ELLIPSE}`}</span>
                    <Tooltip html={false} id="otherUsersInformations">
                        <TooltipRoot>
                            <TooltipHeader>{otherUsersInformations.header}</TooltipHeader>
                            <TooltipContent>{otherUsersInformations.informations}</TooltipContent>
                        </TooltipRoot>
                    </Tooltip>
                </SNumberOfUsers>
            )}
        </SRoot>
    );
};

export default UsersProfile;
