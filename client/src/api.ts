const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

export interface Transaction {
  id?: number;
  amount: number;
  date: string;
  category: string;
  description: string;
}

export const getTransactions = async (): Promise<Transaction[]> => {
  const response = await fetch(`${API_URL}/transactions`);
  const json = await response.json();
  return json.data;
};

export const addTransaction = async (transaction: Transaction): Promise<Transaction> => {
  const response = await fetch(`${API_URL}/transactions`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(transaction),
  });
  const json = await response.json();
  return json.data;
};
