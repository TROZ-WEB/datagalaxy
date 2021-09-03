import cx from 'clsx';
import React from 'react';
import glyphStyles from './glyph.css';
import styles from './index.css';

const Glyph = ({ icon, className }: { icon: string; className?: string }) => {
    return (
        <div className={cx(styles.Root, className)}>
            <span className={cx(glyphStyles.Glyph, glyphStyles[`Glyph${icon}`])} />
        </div>
    );
};

export default Glyph;
