interface GroupMember {
  _id: string;
  name: string;
  rollNo: string;
}

interface SelectedProblemStatement {
  _id: string;
  statement: string;
}

interface CreatedByData {
  name: string;
  rollNo: string;
}

export interface GroupData {
  _id: string;
  groupNumber: number;
  createdAt: string;
  groupMembersData: GroupMember[];
  createdByData: CreatedByData;
  selectedProblemStatement: SelectedProblemStatement;
}