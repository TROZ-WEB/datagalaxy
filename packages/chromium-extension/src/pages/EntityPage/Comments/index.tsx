import React from 'react';
import { useStoreState } from '../../../store/hooks';

const Comments = () => {
    const comments = useStoreState((state) => state.entity.comments);

    return (
        <div>
            {comments.map((comment) => (
                <span key={comment.commentId}>{comment.message}</span>
            ))}
        </div>
    );
};

export default Comments;
