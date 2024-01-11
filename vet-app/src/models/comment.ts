import { IBaseState } from "./base-state.model";
import { IResponseBase } from "./response-base.model";

export interface IComment {
  id: string;
  content: string;
  userId: string; //foreign key to user table
  postId: string; //foreign key to post table
  publishedAt: Date;
  parent_id?: string;
  replies?: IComment[];
}

export type CommentData = {
  content: string;
  postId: string;
  parent_id?: string;
};


export const emptyComment: IComment = {
  id: "",
  content: "",
  userId: "",
  postId: "",
  publishedAt: new Date(),
  parent_id: "",
  replies: [],
};

export interface ICommentState extends IBaseState {
  readonly comments: IComment[];
  readonly comment: IComment;
}

export interface ICommentResponse extends IResponseBase {
  data: IComment;
}

export interface ICommentResponses extends IResponseBase {
  data: IComment[];
}
