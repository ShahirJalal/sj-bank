export interface Transaction {
  id?: number;
  sender: string;
  recipient: string;
  senderAccountNumber: string;
  recipientAccountNumber: string;
  reference: string;
  transactionType: string;
  amount: number;
  timestamp?: string;
}
