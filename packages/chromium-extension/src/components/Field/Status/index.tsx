import React, { useMemo } from 'react';
import Glyph from '../../ui/Glyph';
import styles from './index.css';

const Status = ({ status }: { status: string }) => {
    const iconForStatus = useMemo(() => {
        switch (status) {
            case 'Proposed':
                return <Glyph className={styles.Proposed} icon="Help" />;
            case 'InRevision':
                return <Glyph className={styles.InRevision} icon="Redo2" />;
            case 'InValidation':
                return <Glyph className={styles.InValidation} icon="Recent" />;
            case 'Validated':
                return <Glyph className={styles.Validated} icon="CheckCircle1" />;
            case 'Obsolete':
                return <Glyph className={styles.Obsolete} icon="CloseCircleFilled" />;
        }

        return null;
    }, [status]);

    return (
        <div className={styles.Root}>
            <span className={styles.IconWrapper}>{iconForStatus}</span>
            {chrome.i18n.getMessage(`field_status_${status}`)}
        </div>
    );
};

export default Status;
