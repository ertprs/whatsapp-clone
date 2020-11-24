export interface Group {
  _id: string;
  name: string;
  participants: string[];
  admin: string;
  createdAt: string;
  updatedAt: string;
  lastMessage?: string;
}
