import { format, isValid, parseISO } from 'date-fns';
import { enGB, enUS, fr } from 'date-fns/locale';

import React, { useEffect, useState } from 'react';
import { EntityType, ScreenConfiguration } from 'shared';
import styled, { css } from 'styled-components';
import Tags from '../../../../components/Entity/Tags';
import UserProfile from '../../../../components/Entity/UserProfile';
import Accordion from '../../../../components/ui/Accordion';
import DomainCard from '../../../../components/ui/DomainCard';
import Glyph from '../../../../components/ui/Glyph';
import { useStoreActions, useStoreState } from '../../../../store/hooks';
import ArrowDrop from '../../../../../assets/icons/arrow-drop-up.svg';

/* ---------- STYLES ---------- */

const SRoot = styled.div`
    margin-top: 20px;
    margin-inline: 13px;
    margin-bottom: 14px;
`;

const SSeparator = styled.div`
    height: 1px;
    background-color: #f3f6ff;
`;

const SSubInfoContent = styled.div`
    font-size: 12px;
    color: #001030;
    line-height: 1.5;
    flex-wrap: wrap;
    display: flex;
    word-break: break-word;
`;

const SSubInfoTitle = styled.span`
    font-size: 10px;
    font-weight: 700;
    color: #989cd9;
    margin-bottom: 4px;
`;

const SSubInfoWrapper = styled.div`
    margin-top: 12px;
    display: flex;
    flex-direction: column;
    word-break: break-all;
    width: 100%;
    margin-bottom: 12px;
`;

const STitle = styled.div`
    font-weight: 700;
    font-size: 14px;
`;

const SLink = styled.a`
    text-decoration: none;
    margin-left: 5px;
`;

const SLinkContainer = styled.div`
    display: flex;
`;

const SBasicFieldsContainer = styled.div`
    display: flex;
    flex-direction: column;
    box-shadow: 0px 0px 14px rgba(16, 53, 177, 0.12);
    border-radius: 6px;
    padding: 10px 16px;
`;

const SFieldsContainer = styled.div`
    display: flex;
    flex-direction: column;
    box-shadow: 0px 0px 14px rgba(16, 53, 177, 0.12);
    border-radius: 6px;
    padding-left: 20px;
    padding-right: 20px;
    margin-top: 20px;
    margin-bottom: 14px;
`;

const SPreviewEmptyField = styled.div`
    color: #6d6f88;
    font-style: italic;
`;

const SDisplayMoreDetailsButton = styled.button`
    justify-content: center;
    border: none;
    border-radius: 8px;
    padding-top: 3px;
    padding-bottom: 3px;
    font-size: 12px;
    background: transparent;
    min-width: 30px;
    cursor: pointer;
    display: flex;
    align-items: center;
    position: absolute;
    right: 0;
    font-family: 'Montserrat', sans-serif;
`;

const SDrop = styled.img`
    width: 16px;
    height: 16px;

    ${(props) =>
        props.arrowDropDown
            ? css`
                  transform: rotate(180deg);
              `
            : css`
                  transform: rotate(90deg);
              `}
`;

const SDisplayMoreButtonContainer = styled.div`
    margin-top: 15px;
    position: relative;
    height: 15px;
`;

const SMoreDetailsText = styled.span`
    margin-bottom: 2px;
`;

/* ---------- COMPONENT ---------- */

interface DetailsProps {
    entity: EntityType;
    screenConfiguration: ScreenConfiguration;
}

const isEmptyObject = (elt) => {
    return typeof elt === 'object' ? Object.keys(elt).length === 0 : false;
};

const computeData = (data: any, i: number) => {
    if (data === true) {
        return chrome.i18n.getMessage(`entity_details_data_boolean_1`);
    }
    if (data === false) {
        return chrome.i18n.getMessage(`entity_details_data_boolean_2`);
    }
    if (data.name && data.url) {
        return (
            <SLinkContainer>
                <Glyph icon="Link" />
                <SLink
                    href={`${data.url}${
                        data.url.indexOf('?') !== -1 ? '&openDatagalaxy=true' : '?openDatagalaxy=true'
                    }`}
                >
                    {data.name}
                </SLink>
            </SLinkContainer>
        );
    }

    if (isValid(parseISO(data))) {
        switch (chrome.runtime.getManifest().current_locale) {
            case 'en_US':
                return format(parseISO(data), 'MMM d, yyyy', { locale: enUS });
            case 'fr':
                return format(parseISO(data), 'dd MMM yyyy', { locale: fr });
            default:
                return format(parseISO(data), 'dd MMM yyyy', { locale: enGB });
        }
    }

    if (Array.isArray(data)) {
        return data?.map((d) => {
            if (!d) {
                return '';
            }

            if (d.label) {
                return <Tags.Item key={i} color={d.color} hideLabel={false} tag={d.label} title={d.description} />;
            }

            if (d.type) {
                return <DomainCard entity={d} />;
            }

            if (d?.userId) {
                return <UserProfile user={d} />;
            }

            return <Tags.Item key={i} hideLabel={false} tag={d} />;
        });
    }

    if (typeof data === 'number') {
        switch (chrome.runtime.getManifest().current_locale) {
            case 'fr':
                return data.toLocaleString('fr-FR');
            default:
                return data.toLocaleString('en-EN');
        }
    }

    return data.toString();
};

const computeTitle = (r: any, key: string) => {
    return chrome.i18n.getMessage(`attribute_key_${key}`) || r[key].name || key;
};

const Details = ({ entity, screenConfiguration }: DetailsProps) => {
    const reservedKeys = ['creationTime', 'lastModificationTime'];
    /* eslint-disable-next-line @typescript-eslint/no-unused-vars */
    const { description, tags, summary, status, externalUrl, owners, stewards, technologyCode, pathString, ...rest } =
        entity.attributes;

    const shouldDisplayAttribute = (attribute: any) => {
        return (
            attribute.name &&
            (rest[attribute.name] || rest[attribute.name] === false || rest[attribute.name] === 0) &&
            !isEmptyObject(rest[attribute.name]) &&
            reservedKeys.indexOf(attribute.name) === -1
        );
    };

    const { updateShowMoreDetails } = useStoreActions((actions) => actions.auth);

    const showMoreDetails = useStoreState((state) => state.auth.showMoreDetails);

    const [displayMoreDetails, setDisplayMoreDetails] = useState(false);

    useEffect(() => {
        setDisplayMoreDetails(showMoreDetails);
    }, [showMoreDetails]);

    const [shouldDisplayMoreDetailsButton, setShouldDisplayMoreDetailsButton] = useState(false);

    useEffect(() => {
        let filteredAttributes = [];
        screenConfiguration?.categories?.forEach((category) => {
            filteredAttributes = filteredAttributes.concat(
                category.attributes.filter((att) => shouldDisplayAttribute(att)),
            );
        });
        setShouldDisplayMoreDetailsButton(filteredAttributes.length !== 0);
    }, [screenConfiguration]);

    const handleClickMoreDetail = () => {
        updateShowMoreDetails(!showMoreDetails);
    };

    return (
        <SRoot>
            {entity && screenConfiguration && (
                <>
                    <SBasicFieldsContainer>
                        <Details.SubInfo title="">
                            {summary || (
                                <SPreviewEmptyField>
                                    {chrome.i18n.getMessage(`preview_empty_field_1`)}
                                </SPreviewEmptyField>
                            )}
                        </Details.SubInfo>
                        <Details.Separator />
                        <Details.SubInfo title="">
                            {description || (
                                <SPreviewEmptyField>
                                    {chrome.i18n.getMessage(`preview_empty_field_2`)}
                                </SPreviewEmptyField>
                            )}
                        </Details.SubInfo>
                        <Details.Separator />
                        <Details.SubInfo title="">
                            {tags && tags?.length !== 0 ? (
                                <Tags>
                                    {tags?.sort()?.map((tag, i) => (
                                        /* eslint-disable-next-line */
                                        <Tags.Item key={i} tag={tag} />
                                    ))}
                                </Tags>
                            ) : (
                                <SPreviewEmptyField>
                                    {chrome.i18n.getMessage(`preview_empty_field_3`)}
                                </SPreviewEmptyField>
                            )}
                        </Details.SubInfo>
                        {entity.dataType && externalUrl?.url && (
                            <>
                                <Details.Separator />
                                <Details.SubInfo title="">
                                    {(
                                        <SLinkContainer>
                                            <Glyph icon="Link" />
                                            <SLink href={`${externalUrl?.url}`}>{externalUrl?.name}</SLink>
                                        </SLinkContainer>
                                    ) || (
                                        <SPreviewEmptyField>
                                            {chrome.i18n.getMessage(`preview_empty_field_4`)}
                                        </SPreviewEmptyField>
                                    )}
                                </Details.SubInfo>
                            </>
                        )}
                    </SBasicFieldsContainer>
                    {shouldDisplayMoreDetailsButton && (
                        <SDisplayMoreButtonContainer>
                            <SDisplayMoreDetailsButton onClick={handleClickMoreDetail} type="button">
                                <SMoreDetailsText>{chrome.i18n.getMessage(`moreDetails`)}</SMoreDetailsText>
                                <SDrop alt="Arrow icon" arrowDropDown={displayMoreDetails} src={ArrowDrop} />
                            </SDisplayMoreDetailsButton>
                        </SDisplayMoreButtonContainer>
                    )}

                    {displayMoreDetails &&
                        screenConfiguration?.categories?.length !== 0 &&
                        screenConfiguration?.categories?.map((category) => {
                            const filteredAttributes = category.attributes.filter((att) => shouldDisplayAttribute(att));

                            return (
                                filteredAttributes.length !== 0 && (
                                    <SFieldsContainer>
                                        <Accordion
                                            header={<STitle>{category.name}</STitle>}
                                            openButtonPosition="left"
                                            initialOpen
                                        >
                                            {filteredAttributes.map((attribute, i) => (
                                                <>
                                                    <Details.SubInfo title={computeTitle(rest, attribute.name)}>
                                                        {attribute.format === 'TimeSeriesObject' ? (
                                                            <SPreviewEmptyField>
                                                                {chrome.i18n.getMessage(`attribute_not_supported`)}
                                                            </SPreviewEmptyField>
                                                        ) : (
                                                            computeData(rest[attribute.name], i)
                                                        )}
                                                    </Details.SubInfo>
                                                    <Details.Separator />
                                                </>
                                            ))}
                                        </Accordion>
                                    </SFieldsContainer>
                                )
                            );
                        })}
                </>
            )}
        </SRoot>
    );
};

Details.SubInfo = ({ title, children }: { title: string; children: React.ReactNode }) => (
    <SSubInfoWrapper>
        {title && <SSubInfoTitle>{title}</SSubInfoTitle>}
        <SSubInfoContent>{children}</SSubInfoContent>
    </SSubInfoWrapper>
);

Details.Separator = () => <SSeparator />;

export default Details;
