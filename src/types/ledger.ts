export type TransactionStatus = 'PENDING' | 'COMPLETED' | 'FAILED';
export type AccountType = 'ASSET' | 'LIABILITY' | 'EQUITY' | 'REVENUE' | 'EXPENSE';
export type EntryType = 'DEBIT' | 'CREDIT';

export interface LedgerEntry {
  id: string;
  date: Date;
  description: string;
  amount: number;
  type: EntryType;
  category: string;
  status: TransactionStatus;
  accountId: string;
  reference?: string;
  metadata?: Record<string, any>;
  createdAt: Date;
  updatedAt: Date;
}

export interface LedgerAccount {
  id: string;
  name: string;
  balance: number;
  type: AccountType;
  description?: string;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface Transaction {
  id: string;
  fromAccountId: string;
  toAccountId: string;
  amount: number;
  description: string;
  status: TransactionStatus;
  entries: LedgerEntry[];
  metadata?: Record<string, any>;
  createdAt: Date;
  updatedAt: Date;
}
