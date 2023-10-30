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

export interface notificationType{
	type: "GROUP_INVITE" | "PROJECT_REQUEST";
	createdAt: string;
	groupId?: string;
	groupDetails?: GroupDetails;
	id: string;
	message_by_sender?: string;
	problemStatementDetails?: ProblemStatementDetails;
	status: "accepted" | "rejected";
	user: User;
}