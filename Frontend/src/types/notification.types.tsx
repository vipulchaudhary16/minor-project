interface User {
  id: string;
  name: string;
  message?: string;
}

interface GroupDetails {
  id: string;
  groupNo: number;
}

interface ProblemStatementDetails {
  id: string;
  statement: string;
  domain?: string;
}

export interface GroupInviteNotification {
  type: "GROUP_INVITE";
  createdAt: string;
  groupId: string;
  id: string;
  status: "accepted" | "rejected";
  user: User;
}

export interface ProjectRequestNotification {
  type: "PROJECT_REQUEST";
  createdAt: string;
  groupDetails: GroupDetails;
  id: string;
  message_by_sender: string;
  problemStatementDetails: ProblemStatementDetails;
  status: "accepted" | "rejected";
  user: User;
}

export interface notificationType {
  type: "GROUP_INVITE" | "PROJECT_REQUEST" | "CUSTOM_PROJECT_REQUEST";
  groupId?: string;
  id: string;
  message_by_sender?: string;
  status: "accepted" | "rejected" | "pending";
  createdAt: string;
  user?: {
    id: string;
    name: string;
  };
  groupDetails?: {
    id: string;
    groupNo: number;
  };
  problemStatementDetails?: {
    title?: string;
    statement: string;
    domain: string;
  };
}
