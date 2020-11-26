export interface Group {
  _id: string;
  name: string;
  participants: { firstName: string; lastName: string; _id: string }[];
  admin: string;
  createdAt: string;
  updatedAt: string;
  lastMessage?: string;
}
