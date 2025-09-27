export interface Block {
  id: string;
  type: string;
  question: string;
  options?: string[];
  answer?: string | string[];
}
