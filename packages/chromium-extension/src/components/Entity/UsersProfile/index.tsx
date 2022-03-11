import React, { useEffect, useState } from 'react';
import { UserType } from 'shared';
import styled from 'styled-components';
import Avatar from '../../Avatar';

/* ---------- STYLES ---------- */

const SAvatarWrapper = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
`;

const SRole = styled.span`
    font-weight: 700;
    font-size: 10px;
    color: #1035b1;
`;

const SRoot = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
`;

const STextInfoWrapper = styled.div`
    display: flex;
    flex-direction: column;
    margin-right: 3px;
    margin-left: 2px;
`;

const SUserName = styled.span`
    font-size: 10px;
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

/* ---------- COMPONENT ---------- */

const LIMIT_AVATAR_ELLIPSE = 2;

const UsersProfile = ({
    governanceRole,
    users,
    hideLabel = false,
    ellipsed = true,
}: {
    governanceRole?: 'owner' | 'steward';
    users: UserType[];
    hideLabel?: boolean;
    ellipsed?: boolean;
}) => {
    const usersToDisplay = users.slice(0, LIMIT_AVATAR_ELLIPSE);
    const otherUsers = users.slice(LIMIT_AVATAR_ELLIPSE, users.length);
    const [otherUsersInformations, setOtherUsersInformations] = useState('');

    useEffect(() => {
        let informations = '';
        otherUsers.forEach((user, index, array) => {
            informations += `${user.firstName} ${user.lastName} ${index === array.length - 1 ? '' : ','} `;
        });
        setOtherUsersInformations(informations);
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
                                size="mini"
                                user={user}
                            />
                        ),
                )}
            </SAvatarWrapper>
            {users?.length > LIMIT_AVATAR_ELLIPSE && (
                <SNumberOfUsers>
                    <span title={otherUsersInformations}>{`+${users.length - LIMIT_AVATAR_ELLIPSE}`}</span>
                </SNumberOfUsers>
            )}
            {(users?.length <= LIMIT_AVATAR_ELLIPSE && ellipsed) ||
                (!hideLabel && (
                    <STextInfoWrapper>
                        {governanceRole && <SRole>{chrome.i18n.getMessage(`entity_${governanceRole}`)}</SRole>}
                        <SUserName>
                            {users?.length > 1
                                ? chrome.i18n.getMessage('entity_steward_multiple', [users?.length])
                                : `${users ? users[0].firstName : ''}. ${users ? users[0].lastName[0] : ''}`}
                        </SUserName>
                    </STextInfoWrapper>
                ))}
        </SRoot>
    );
};

export default UsersProfile;
