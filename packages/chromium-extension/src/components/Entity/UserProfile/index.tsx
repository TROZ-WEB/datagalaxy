import React from 'react';
import styles from './index.css';

const UserProfile = ({
    firstName,
    lastName,
    governanceRole,
    profileThumbnailUrl,
}: {
    firstName: string;
    lastName: string;
    governanceRole: 'owner' | 'steward';
    profileThumbnailUrl: string;
}) => {
    return (
        <div className={styles.Root}>
            <img alt={`${firstName}. ${lastName[0]} avatar`} className={styles.Avatar} src={profileThumbnailUrl} />
            <div className={styles.TextInfoWrapper}>
                <span className={styles.Role}>{chrome.i18n.getMessage(`entity_${governanceRole}`)}</span>
                <span className={styles.UserName}>{`${firstName}. ${lastName[0]}`}</span>
            </div>
        </div>
    );
};

export default UserProfile;
