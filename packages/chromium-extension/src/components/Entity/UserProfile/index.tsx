import React from 'react';
import { UserType } from 'shared';
import styled from 'styled-components';
import Avatar from '../../Avatar';

/* ---------- STYLES ---------- */

const SAvatarWrapper = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    border-radius: 12px 3px 3px 12px;
`;

const SRoot = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    margin: 2px;
    border-radius: 12px 3px 3px 12px;
`;

const STextInfoWrapper = styled.div`
    display: flex;
    flex-direction: column;
    margin-right: 3px;
    margin-left: 2px;
`;

const SUserName = styled.span`
    font-size: 12px;
`;

/* ---------- COMPONENT ---------- */

const UserProfile = ({ user }: { user: UserType }) => {
    return (
        <SRoot>
            <SAvatarWrapper>
                <Avatar key={user?.userId} grouped={false} showTooltip={false} size="mini" user={user} />
            </SAvatarWrapper>

            <STextInfoWrapper>
                <SUserName>
                    {user.firstName} {user.lastName}
                </SUserName>
            </STextInfoWrapper>
        </SRoot>
    );
};

export default UserProfile;
