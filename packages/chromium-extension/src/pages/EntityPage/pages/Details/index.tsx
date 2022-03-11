import { format, isValid, parseISO } from 'date-fns';
import React from 'react';
import { DataTypeMapping, EntityType } from 'shared';
import styled from 'styled-components';
import Tags from '../../../../components/Entity/Tags';
import UserProfile from '../../../../components/Entity/UserProfile';
import Accordion from '../../../../components/ui/Accordion';
import DomainCard from '../../../../components/ui/DomainCard';
import Glyph from '../../../../components/ui/Glyph';

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
`;

const SSubInfoTitle = styled.span`
    font-size: 10px;
    font-weight: 600;
    color: #1035b1;
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
    padding: 20px;
    margin-top: 20px;
`;

const SPreviewEmptyField = styled.div`
    color: #6d6f88;
    font-style: italic;
`;

/* ---------- COMPONENT ---------- */

interface DetailsProps {
    entity: EntityType;
}

const isEmptyObject = (elt) => {
    return typeof elt === 'object' ? Object.keys(elt).length === 0 : false;
};

const Details = ({ entity }: DetailsProps) => {
    const reservedKeys = ['creationTime', 'lastModificationTime', 'owners', 'stewards', 'logicalParentData'];
    /* eslint-disable-next-line @typescript-eslint/no-unused-vars */
    const { description, tags, summary, owners, stewards, status, externalUrl, ...rest } = entity.attributes;

    const computeData = (data: any) => {
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
            return format(parseISO(data), 'dd/MM/yyyy');
        }

        if (Array.isArray(data)) {
            return data?.map((d) => {
                if (!d) {
                    return '';
                }

                if (d.label) {
                    return (
                        <Tags.Item
                            key={d + Math.random()}
                            color={d.color}
                            hideLabel={false}
                            tag={d.description || d.label}
                        />
                    );
                }

                if (d.type) {
                    return <DomainCard entity={d} />;
                }

                if (d?.userId) {
                    return <UserProfile user={d} />;
                }

                return <Tags.Item key={d + Math.random()} hideLabel={false} tag={d} />;
            });
        }

        if (typeof data === 'number') {
            return data.toLocaleString(chrome.runtime.getManifest().current_locale);
        }

        return data.toString();
    };

    const computeTitle = (r: any, key: string) => {
        console.info('KEY IS :');
        console.info(key);

        return chrome.i18n.getMessage(`attribute_key_${key}`) || r[key].name || key;
    };

    return (
        <>
            <SBasicFieldsContainer>
                <Details.SubInfo title="">
                    {summary || (
                        <SPreviewEmptyField>{chrome.i18n.getMessage(`preview_empty_field_1`)}</SPreviewEmptyField>
                    )}
                </Details.SubInfo>
                <Details.Separator />
                <Details.SubInfo title="">
                    {description || (
                        <SPreviewEmptyField>{chrome.i18n.getMessage(`preview_empty_field_2`)}</SPreviewEmptyField>
                    )}
                </Details.SubInfo>
                <Details.Separator />
                <Details.SubInfo title="">
                    {tags.length !== 0 ? (
                        <Tags>
                            {tags?.map((tag) => (
                                <Tags.Item key={tag} tag={tag} />
                            ))}
                        </Tags>
                    ) : (
                        <SPreviewEmptyField>{chrome.i18n.getMessage(`preview_empty_field_3`)}</SPreviewEmptyField>
                    )}
                </Details.SubInfo>
                {entity.dataType && entity.dataType === DataTypeMapping.Usage && externalUrl.url && (
                    <>
                        <Details.Separator />
                        <Details.SubInfo title="">
                            {(
                                <SLinkContainer>
                                    <Glyph icon="Link" />
                                    <SLink href={`${externalUrl.url}`}>{externalUrl.name}</SLink>
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
            <Accordion
                header={<STitle>{chrome.i18n.getMessage(`entity_details_sections_general`)}</STitle>}
                initialOpen
            >
                {Object.keys(rest).map(
                    (key) =>
                        rest[key] &&
                        !rest[key].trend &&
                        !isEmptyObject(rest[key]) &&
                        reservedKeys.indexOf(key) === -1 && (
                            <>
                                <Details.SubInfo title={computeTitle(rest, key)}>
                                    {computeData(rest[key])}
                                </Details.SubInfo>
                                <Details.Separator />
                            </>
                        ),
                )}
            </Accordion>
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
