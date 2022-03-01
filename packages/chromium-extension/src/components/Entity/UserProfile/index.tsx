import React from 'react';
import { UserType } from 'shared';
import styled from 'styled-components';
import Avatar from '../../Avatar';
import Glyph from '../../ui/Glyph';

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

const SGlyph = styled(Glyph)`
    font-size: 12px !important;
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

/* ---------- COMPONENT ---------- */

const LIMIT_AVATAR_ELLIPSE = 3;

const UserProfile = ({
    governanceRole,
    users,
    hideLabel = false,
    ellipsed = true,
}: {
    governanceRole: 'owner' | 'steward';
    users: UserType[];
    hideLabel?: boolean;
    ellipsed?: boolean;
}) => {
    return (
        <SRoot>
            <SAvatarWrapper>
                {users?.map(
                    (user, index) =>
                        user && (
                            <Avatar
                                key={user?.userId}
                                grouped={users?.length > 1 && index !== users?.length - 1}
                                size="mini"
                                user={user}
                            />
                        ),
                )}
            </SAvatarWrapper>
            {users?.length > LIMIT_AVATAR_ELLIPSE && <SGlyph icon="Add" />}
            {(users?.length <= LIMIT_AVATAR_ELLIPSE && ellipsed) ||
                (!hideLabel && (
                    <STextInfoWrapper>
                        <SRole>{chrome.i18n.getMessage(`entity_${governanceRole}`)}</SRole>
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

export default UserProfile;
