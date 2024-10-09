export type Email = {
  id: string;
  destination: string;
  subject?: string;
  body?: string;
  files?: string[];
  sender: string;
  createdAt: string;
};
