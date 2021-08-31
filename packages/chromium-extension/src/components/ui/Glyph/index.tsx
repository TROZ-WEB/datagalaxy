import cx from 'clsx';
import React from 'react';
import glyphStyles from './glyph.css';
import styles from './index.css';

const Glyph = ({ icon }: { icon: string }) => {
    return (
        <div className={styles.Root}>
            <span className={cx(glyphStyles.Glyph, glyphStyles[`Glyph${icon}`])} />
        </div>
    );
};

export default Glyph;
