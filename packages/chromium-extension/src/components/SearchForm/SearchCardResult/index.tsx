import cx from 'clsx';
import React from 'react';
import { fieldsTypeRelatedInfos } from 'shared';
import Breadcrumb from '../../Breadcrumb';
import Glyph from '../../ui/Glyph';
import Looker from '../../../../assets/looker.png';
import styles from './index.css';

const isTechnical = (field): boolean => fieldsTypeRelatedInfos[field.type].kind === 'Technical';
const SearchCardResult = ({ field }: { field: any }) => {
    return (
        <div className={styles.Root} onClick={() => {}} onKeyPress={() => {}} role="button" tabIndex={0}>
            <div className={cx(styles.LeftSide, isTechnical(field) ? styles.TechnicalColor : styles.FunctionalColor)}>
                <div
                    className={cx(
                        styles.LeftSideBackground,
                        isTechnical(field) ? styles.TechnicalColorBackground : styles.FunctionalColorBackground,
                    )}
                />
                <Glyph icon={fieldsTypeRelatedInfos[field.type].glyph} />
                {/* <span className={styles.MiniText}>{field.type}</span> */}
            </div>
            <div className={styles.RightSide}>
                <div className={styles.BreadcrumbWrapper}>
                    <img alt="" className={styles.BreadcrumbPrefix} src={Looker} />
                    <Breadcrumb path={field.path} />
                </div>
                <span className={styles.FieldName}>{field.name}</span>
            </div>
        </div>
    );
};

export default SearchCardResult;
