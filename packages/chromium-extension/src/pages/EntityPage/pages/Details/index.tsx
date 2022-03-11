import { format, isValid, parseISO } from 'date-fns';
import React from 'react';
import { EntityType } from 'shared';
import styled from 'styled-components';
import Status from '../../../../components/Entity/Status';
import Tags from '../../../../components/Entity/Tags';
import UserProfile from '../../../../components/Entity/UserProfile';
import Accordion from '../../../../components/ui/Accordion';
import DomainCard from '../../../../components/ui/DomainCard';

/* ---------- STYLES ---------- */

const SSeparator = styled.div`
    height: 1px;
    background-color: #f3f6ff;
`;

const SSubInfoContent = styled.div`
    font-size: 12px;
    color: #001030;
    margin-bottom: 12px;
    line-height: 1.5;
    flex-wrap: wrap;
    display: flex;
`;

const SSubInfoTitle = styled.span`
    font-size: 10px;
    font-weight: 600;
    color: #1035b1;
    margin-top: 12px;
    margin-bottom: 4px;
`;

const SSubInfoWrapper = styled.div`
    display: flex;
    flex-direction: column;
    word-break: break-all;
    width: 100%;
`;

const STitle = styled.div`
    font-weight: 700;
    font-size: 14px;
`;

/* ---------- COMPONENT ---------- */

interface DetailsProps {
    entity: EntityType;
}

const Details = ({ entity }: DetailsProps) => {
    const reservedKeys = ['creationTime', 'lastModificationTime', 'owners', 'stewards', 'logicalParentData'];
    const { description, tags, summary, status, owners, stewards, ...rest } = entity.attributes;

    console.warn('UNUSED : ', stewards);
    console.warn('UNUSED : ', owners);

    const computeData = (data: any) => {
        if (data === true) {
            return chrome.i18n.getMessage(`entity_details_data_boolean_1`);
        }
        if (data === false) {
            return chrome.i18n.getMessage(`entity_details_data_boolean_2`);
        }
        if (data.name && data.url) {
            return (
                <a
                    href={`${data.url}${
                        data.url.indexOf('?') !== -1 ? '&openDatagalaxy=true' : '?openDatagalaxy=true'
                    }`}
                >
                    {data.name}
                </a>
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

        return data.toString();
    };

    const computeTitle = (r: any, key: string) => {
        return chrome.i18n.getMessage(`attribute_key_${key}`) || r[key].name || key;
    };

    return (
        <Accordion header={<STitle>{chrome.i18n.getMessage(`entity_details_sections_general`)}</STitle>} initialOpen>
            <Details.SubInfo title={chrome.i18n.getMessage(`entity_details_sections_general_status`)}>
                <Status status={status} />
            </Details.SubInfo>
            <Details.Separator />
            <Details.SubInfo title={chrome.i18n.getMessage(`entity_details_sections_general_tags`)}>
                <Tags>
                    {tags?.map((tag) => (
                        <Tags.Item key={tag} hideLabel={tags?.length > 1} tag={tag} />
                    ))}
                </Tags>
            </Details.SubInfo>
            <Details.Separator />
            <Details.SubInfo title={chrome.i18n.getMessage(`entity_details_sections_general_summary`)}>
                {summary}
            </Details.SubInfo>
            <Details.Separator />
            <Details.SubInfo title={chrome.i18n.getMessage(`entity_details_sections_general_description`)}>
                {description}
            </Details.SubInfo>
            {Object.keys(rest).map(
                (key) =>
                    rest[key] &&
                    !rest[key].trend &&
                    reservedKeys.indexOf(key) === -1 && (
                        <>
                            <Details.SubInfo title={computeTitle(rest, key)}>{computeData(rest[key])}</Details.SubInfo>
                            <Details.Separator />
                        </>
                    ),
            )}
        </Accordion>
    );
};

Details.SubInfo = ({ title, children }: { title: string; children: React.ReactNode }) => {
    return (
        <SSubInfoWrapper>
            <SSubInfoTitle>{title}</SSubInfoTitle>
            <SSubInfoContent>{children}</SSubInfoContent>
        </SSubInfoWrapper>
    );
};

Details.Separator = () => {
    return <SSeparator />;
};

export default Details;
