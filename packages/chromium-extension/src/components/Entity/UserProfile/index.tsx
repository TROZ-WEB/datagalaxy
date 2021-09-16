import React from 'react';
import { UserType } from 'shared';
import Avatar from '../../Avatar';
import styles from './index.css';

const UserProfile = ({ governanceRole, users }: { governanceRole: 'owner' | 'steward'; users: UserType[] }) => {
    return (
        <div className={styles.Root}>
            <div className={styles.AvatarWrapper}>
                {users.map((user, index) => (
                    <Avatar key={user.userId} grouped={users.length > 1 && index !== users.length - 1} user={user} />
                ))}
            </div>
            <div className={styles.TextInfoWrapper}>
                <span className={styles.Role}>{chrome.i18n.getMessage(`entity_${governanceRole}`)}</span>
                <span className={styles.UserName}>
                    {users.length > 1
                        ? chrome.i18n.getMessage('entity_steward_multiple', [users.length])
                        : `${users[0].firstName}. ${users[0].lastName[0]}`}
                </span>
            </div>
        </div>
    );
};

export default UserProfile;
