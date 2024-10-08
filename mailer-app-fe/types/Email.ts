export type Email = {
  id:          string;
  destination: string;
  subject?:     string;
  body?:        string;
  sender:      string;
  createdAt:   string;
}