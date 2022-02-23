import React from 'react';
import { UserType } from 'shared';
import Avatar from '../../Avatar';
import Glyph from '../../ui/Glyph';
import styles from './index.css';

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
        <div className={styles.Root}>
            <div className={styles.AvatarWrapper}>
                {users?.map((user, index) => (
                    <Avatar
                        key={user?.userId}
                        grouped={users?.length > 1 && index !== users?.length - 1}
                        size="mini"
                        user={user}
                    />
                ))}
            </div>
            {users?.length > LIMIT_AVATAR_ELLIPSE && <Glyph className={styles.SmallGlyph} icon="Add" />}
            {(users?.length <= LIMIT_AVATAR_ELLIPSE && ellipsed) ||
                (!hideLabel && (
                    <div className={styles.TextInfoWrapper}>
                        <span className={styles.Role}>{chrome.i18n.getMessage(`entity_${governanceRole}`)}</span>
                        <span className={styles.UserName}>
                            {users?.length > 1
                                ? chrome.i18n.getMessage('entity_steward_multiple', [users?.length])
                                : `${users ? users[0].firstName : ''}. ${users ? users[0].lastName[0] : ''}`}
                        </span>
                    </div>
                ))}
        </div>
    );
};

export default UserProfile;
