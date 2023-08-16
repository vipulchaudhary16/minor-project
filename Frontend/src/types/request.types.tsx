export interface TRequest {
	id: string;
	user: {
		id: string;
		message?: string;
		name: string;
	};
	type: string;
	status: string;
	groupId: string;
	createdAt: string;
	problemStatementDetails?: {
		id: string;
		statement: string;
	};
	message_by_sender?: string;
	groupDetails?: {
		id: string;
		groupNo: number;
	};
}
