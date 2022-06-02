import React, { useEffect } from 'react';
import styled from 'styled-components';
import { useStoreState } from '../../../store/hooks';
import CommentItem from './CommentItem';

const SRoot = styled.div`
    margin-top: 20px;
    height: 100%;
`;

const SHeader = styled.div`
    font-size: 14px;
    font-weight: 700;
    line-height: 20px;
    padding-inline: 16px;
`;

const SDivider = styled.div`
    position: absolute;
    height: 50px;
    width: 100%;
    background: linear-gradient(to top, rgba(255, 255, 255, 0), rgba(255, 255, 255, 1));
`;

const CommentsContainer = styled.div`
    display: flex;
    flex-direction: column;
    padding-top: 30px;
    padding-inline: 16px;
    height: calc(100% - 70px);
    overflow: auto;
`;

const Comments = () => {
    const comments = useStoreState((state) => state.entity.comments);
    const refs = comments?.reduce((acc, value) => {
        acc[value.commentId] = React.createRef();

        return acc;
    }, {});

    useEffect(() => {
        refs[comments.pop().commentId].current?.scrollIntoView();
    }, [refs]);

    return (
        <SRoot>
            <SHeader>{chrome.i18n.getMessage(`entity_label_full_Comments`)}</SHeader>
            <SDivider />
            <CommentsContainer>
                {comments &&
                    comments.map((comment) => (
                        <CommentItem key={comment.commentId} ref={refs[comment.commentId]} {...comment} />
                    ))}
            </CommentsContainer>
        </SRoot>
    );
};

export default Comments;
