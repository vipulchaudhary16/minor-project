interface GroupMember {
  _id: string;
  name: string;
  rollNo: string;
}

export interface Group {
  _id: string;
  groupNumber: number;
  createdAt: string;
  groupMembersData: GroupMember[];
  createdByData: GroupMember[];
  problemStatementData: {
    _id: string | null;
    statement: string | null;
  }[];
}

