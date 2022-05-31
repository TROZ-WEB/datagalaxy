import { formatDistance } from 'date-fns';
import React, { useEffect, useRef } from 'react';
import ReactDOM from 'react-dom';
import { UserType } from 'shared';
import styled, { StyleSheetManager } from 'styled-components';
import Avatar from '../../../components/Avatar';
import { useStoreActions } from '../../../store/hooks';
import { Comment } from '../../../store/models/entityModel';
import { Theme } from '../../../Theme';
import { getLocale } from '../../../utils';

const SContainer = styled.div`
    display: flex;
    flex-direction: column;
    box-shadow: 0px 2px 12px rgba(2, 42, 142, 0.1);
    border-radius: 6px;
    padding: 10px 16px 10px 16px;
    margin-bottom: 12px;
`;

const SHeader = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
`;

const SUser = styled.div`
    display: flex;
    align-items: center;
`;

const SMentionName = styled.span`
    padding-left: 5px;
`;

const SName = styled(SMentionName)`
    font-size: 12px;
    font-weight: 700;
    color: ${Theme.black};
`;

const SDate = styled.span`
    padding-left: 10px;
    font-size: 10px;
    font-weight: 500;
    color: ${Theme.grey};
`;

const SContent = styled.div`
    font-size: 70%;

    &.ql-editor {
        padding-inline: 0px;
    }

    rich-text-mention {
        display: inline-flex;
        margin-bottom: 2px;
        vertical-align: middle;
    }
`;

const CommentItem = React.forwardRef<HTMLDivElement, Comment>(({ creationTime, creationUser, message }, ref) => {
    const contentRef = useRef<HTMLDivElement>(null);
    const { getUserById } = useStoreActions((state) => state.users);

    const dateFromNow = formatDistance(new Date(creationTime), new Date(), {
        locale: getLocale(),
        addSuffix: true,
    });

    const renderMention = (user: UserType) => (
        <SUser>
            <Avatar size="normal" user={user} />
            <SMentionName>
                {user.firstName} {user.lastName}
            </SMentionName>
        </SUser>
    );

    const transformMentions = async () => {
        const domParser = new DOMParser();
        const messageDocument = domParser.parseFromString(message, 'text/html');
        const mentions = messageDocument.querySelectorAll('rich-text-mention');
        const root = document.getElementById('datagalaxy_shadow_root').shadowRoot;

        const userIds: string[] = [];

        mentions.forEach((mention) => {
            const userId = mention.getAttribute('mention-id');
            userIds.push(userId);
        });

        for (const userId of userIds) {
            // eslint-disable-next-line no-await-in-loop
            const user = await getUserById({ userId });
            if (user) {
                const mention = messageDocument.querySelector(`rich-text-mention[mention-id="${userId}"]`);
                // force styled-components to append style to the root
                ReactDOM.render(<StyleSheetManager target={root}>{renderMention(user)}</StyleSheetManager>, mention);
            }
        }

        const bodyChildren = Array.from(messageDocument.body.children);

        bodyChildren.forEach((child) => {
            contentRef.current.appendChild(child);
        });
    };

    useEffect(() => {
        transformMentions();
    }, [message]);

    return (
        <SContainer ref={ref} className="ql-snow">
            <SHeader>
                <SUser>
                    <Avatar user={creationUser} />
                    <SName>
                        {creationUser.firstName} {creationUser.lastName}
                    </SName>
                </SUser>
                <SDate>{dateFromNow}</SDate>
            </SHeader>
            <SContent ref={contentRef} className="ql-editor" />
        </SContainer>
    );
});

export default CommentItem;
