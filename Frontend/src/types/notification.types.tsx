interface User {
	name: string;
	email: string;
	id: string;
}

interface ProblemStatement {
	statement: string;
	id: string;
}

export interface NotificationCardProps {
	notification: {
		_id: string;
		message_by_from: string;
		message_by_to: string;
		status: string;
		fromUser: User;
		toUser: User;
		problemStatement: ProblemStatement;
	};
}