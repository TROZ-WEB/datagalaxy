/* eslint-disable camelcase */
export interface CommentEntity {
    message: string;
    commentId: string;
    creationTime: string;
    creationUser: string;
    lastModificationTime: string;
    lastModificationUser: string;
}

export interface CommentsResponse extends Array<CommentEntity> {}
