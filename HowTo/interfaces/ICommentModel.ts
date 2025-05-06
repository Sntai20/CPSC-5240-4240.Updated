export interface ICommentModel {
    commentId:       string;
    tutorialId:      string;
    userId:          string;
    userName:        string;
    content:         string;
    createdDate?:    Date;
    isAmendment?:    boolean;
    amendmentDetails?: {
      stepNumber:     number;
      proposedChange: string;
    };
    likes?:          number;
    parentCommentId?: string | null;
  }
  