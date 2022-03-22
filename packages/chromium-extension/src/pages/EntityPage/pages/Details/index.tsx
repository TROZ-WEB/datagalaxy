import { format, isValid, parseISO } from 'date-fns';
import { enGB, enUS, fr } from 'date-fns/locale';

import React, { useState } from 'react';
import { DataTypeMapping, EntityType, ScreenConfiguration } from 'shared';
import styled, { css } from 'styled-components';
import Tags from '../../../../components/Entity/Tags';
import UserProfile from '../../../../components/Entity/UserProfile';
import Accordion from '../../../../components/ui/Accordion';
import DomainCard from '../../../../components/ui/DomainCard';
import Glyph from '../../../../components/ui/Glyph';
import ArrowDrop from '../../../../../assets/icons/arrow-drop-up.svg';

/* ---------- STYLES ---------- */

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
    padding: 10px 20px 10px 20px;
    margin-top: 20px;
    margin-bottom: 20px;
`;

const SFieldsContainer = styled.div`
    display: flex;
    flex-direction: column;
    box-shadow: 0px 0px 14px rgba(16, 53, 177, 0.12);
    border-radius: 6px;
    padding-left: 20px;
    padding-right: 20px;
    margin-top: 20px;
    margin-bottom: 20px;
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
    font-size: 10px;
    background: transparent;
    color: #1035b1;
    min-width: 30px;
    cursor: pointer;
    display: flex;
    align-items: center;
    position: absolute;
    right: 0;
`;

const SDrop = styled.img`
    width: 10px;
    height: 10px;

    ${(props) =>
        props.arrowDropDown &&
        css`
            transform: rotate(180deg);
        `}
`;

const SDisplayMoreButtonContainer = styled.div`
    position: relative;
    height: 15px;
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
            case 'en-US':
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
    const { description, tags, summary, status, externalUrl, owners, stewards, ...rest } = entity.attributes;

    const [displayMoreDetails, setDisplayMoreDetails] = useState(false);

    return (
        // eslint-disable-next-line react/jsx-no-useless-fragment
        <>
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
                            {tags.length !== 0 ? (
                                <Tags>
                                    {tags?.map((tag, i) => (
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
                        {entity.dataType && entity.dataType === DataTypeMapping.Usage && externalUrl?.url && (
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
                    <SDisplayMoreButtonContainer>
                        <SDisplayMoreDetailsButton
                            onClick={() => {
                                setDisplayMoreDetails(!displayMoreDetails);
                            }}
                            type="button"
                        >
                            {chrome.i18n.getMessage(`moreDetails`)}
                            <SDrop alt="Arrow icon" arrowDropDown={displayMoreDetails} src={ArrowDrop} />
                        </SDisplayMoreDetailsButton>
                    </SDisplayMoreButtonContainer>

                    {displayMoreDetails &&
                        screenConfiguration.categories.map((category) => {
                            const filteredAttributes = category.attributes.filter((att) => {
                                return (
                                    rest[att.name] &&
                                    !rest[att.name].trend &&
                                    !isEmptyObject(rest[att.name]) &&
                                    reservedKeys.indexOf(att.name) === -1
                                );
                            });

                            return (
                                /* eslint-disable-next-line react/jsx-no-useless-fragment */
                                <>
                                    {filteredAttributes.length !== 0 && (
                                        <SFieldsContainer>
                                            <Accordion header={<STitle>{category.name}</STitle>} initialOpen>
                                                {filteredAttributes.map((attribute, i) => {
                                                    if (
                                                        rest[attribute.name] &&
                                                        !rest[attribute.name].trend &&
                                                        !isEmptyObject(rest[attribute.name]) &&
                                                        reservedKeys.indexOf(attribute.name) === -1
                                                    ) {
                                                        return (
                                                            <>
                                                                <Details.SubInfo
                                                                    title={computeTitle(rest, attribute.name)}
                                                                >
                                                                    {computeData(rest[attribute.name], i)}
                                                                </Details.SubInfo>
                                                                <Details.Separator />
                                                            </>
                                                        );
                                                    }

                                                    // eslint-disable-next-line react/jsx-no-useless-fragment
                                                    return <></>;
                                                })}
                                            </Accordion>
                                        </SFieldsContainer>
                                    )}
                                </>
                            );
                        })}
                </>
            )}
        </>
    );
};

Details.SubInfo = ({ title, children }: { title: string; children: React.ReactNode }) => {
    return (
        <SSubInfoWrapper>
            {title && <SSubInfoTitle>{title}</SSubInfoTitle>}
            <SSubInfoContent>{children}</SSubInfoContent>
        </SSubInfoWrapper>
    );
};

Details.Separator = () => {
    return <SSeparator />;
};

export default Details;
