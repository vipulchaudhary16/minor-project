import { Group } from '../../types/index.types';

interface GroupTableProps {
	groupInformation: Group;
}

export const GroupTable: React.FC<GroupTableProps> = ({ groupInformation }) => {
	console.log(groupInformation);
	return (
		<div>
			<p>Display group info here</p>
		</div>
	);
};
