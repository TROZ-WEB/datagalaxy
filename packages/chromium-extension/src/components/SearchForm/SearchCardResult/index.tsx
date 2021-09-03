import cx from 'clsx';
import React from 'react';
import { useHistory } from 'react-router-dom';
import { fieldsTypeRelatedInfos } from 'shared';
import Breadcrumb from '../../Breadcrumb';
import Status from '../../Field/Status';
import UserProfile from '../../Field/UserProfile';
import Glyph from '../../ui/Glyph';
import Looker from '../../../../assets/looker.png';
import styles from './index.css';

const isTechnical = (field): boolean => fieldsTypeRelatedInfos[field.type].kind === 'Technical';
const SearchCardResult = ({ field }: { field: any }) => {
    const history = useHistory();

    const onCardResultClick = () => {
        history.push(`/fields/${field.id}`);
    };

    return (
        <div
            className={styles.Root}
            onClick={onCardResultClick}
            onKeyPress={onCardResultClick}
            role="button"
            tabIndex={0}
        >
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
                <a className={styles.FieldName} href={field.objectUrl} rel="noreferrer" target="_blank">
                    {field.name}
                </a>
                <div className={styles.ExpandedWrapper}>
                    <Status status={field.attributes.status} />
                    <div className={styles.AssociatedUsersWrapper}>
                        <UserProfile
                            firstName={field.owner.firstName}
                            governanceRole="owner"
                            lastName={field.owner.lastName}
                            profileThumbnailUrl={field.owner.profileThumbnailUrl}
                        />
                        <UserProfile
                            firstName={field.steward.firstName}
                            governanceRole="steward"
                            lastName={field.steward.lastName}
                            profileThumbnailUrl={field.steward.profileThumbnailUrl}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SearchCardResult;
