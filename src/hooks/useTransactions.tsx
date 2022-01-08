import { createContext, useEffect, useState, ReactNode, useContext } from "react";
import { api } from "../services/api";

interface Transaction {
  id: number;
  title: string;
  type: string;
  category: string;
  amount: number;
  createdAt: string;
}

type TransactionsInput = Omit<Transaction, 'id' | 'createdAt'>;
// Outra forma:
// type TransactionsInput = Pick<Transaction, 'title' | 'type' | 'amount' | 'category'>;

interface TransactionsProviderProps {
  children: ReactNode;
}

interface TransactionsContextData {
  transactions: Transaction[];
  createTransaction: (transaction: TransactionsInput ) => Promise<void>;
}

const TransactionsContext = createContext<TransactionsContextData>({} as TransactionsContextData);

export const TransactionsProvider = ({ children }: TransactionsProviderProps) => {
  const [ transactions, setTransactions ] = useState<Transaction[]>([]);

  const createTransaction = async (transactionInput: TransactionsInput) => {
    const response = await api.post('/transactions', {
      ...transactionInput,
      createdAt: new Date()
    });

    const { transaction } = response.data;
    setTransactions([...transactions, transaction]);
  }

  useEffect(() => {
    api.get('transactions')
      .then(response => setTransactions(response.data.transactions));
  }, []);

  return (
    <TransactionsContext.Provider value={{
      transactions,
      createTransaction
    }}>
      { children }
    </TransactionsContext.Provider>
  )
}

export const useTransactions = () => {
  const transactions = useContext(TransactionsContext);

  return transactions;
}