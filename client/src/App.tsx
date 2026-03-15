import { useState, useEffect } from 'react';
import { getTransactions, addTransaction, type Transaction } from './api';

function App() {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [amount, setAmount] = useState('');
  const [date, setDate] = useState(new Date().toISOString().split('T')[0]);
  const [category, setCategory] = useState('Food');
  const [description, setDescription] = useState('');

  useEffect(() => {
    fetchTransactions();
  }, []);

  const fetchTransactions = async () => {
    try {
      const data = await getTransactions();
      setTransactions(data || []);
    } catch (err) {
      console.error('Failed to fetch transactions', err);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!amount || !date || !category) return;
    try {
      await addTransaction({
        amount: parseFloat(amount),
        date,
        category,
        description,
      });
      setAmount('');
      setDescription('');
      fetchTransactions();
    } catch (err) {
      console.error('Failed to add transaction', err);
    }
  };

  const totalSpend = (transactions || []).reduce((sum, t) => sum + t.amount, 0);

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-8 text-center text-blue-600">Financial Records</h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Summary Section */}
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold mb-4">Summary</h2>
            <div className="text-4xl font-bold text-gray-800">${totalSpend.toFixed(2)}</div>
            <p className="text-gray-500 mt-2">Total spending</p>
          </div>

          {/* Add Transaction Section */}
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold mb-4">Add Transaction</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Amount</label>
                <input
                  type="number"
                  step="0.01"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 p-2 border"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Date</label>
                <input
                  type="date"
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 p-2 border"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Category</label>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 p-2 border"
                >
                  <option>Food</option>
                  <option>Rent</option>
                  <option>Utilities</option>
                  <option>Entertainment</option>
                  <option>Transport</option>
                  <option>Other</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Description</label>
                <input
                  type="text"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 p-2 border"
                />
              </div>
              <button
                type="submit"
                className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition"
              >
                Add Spend
              </button>
            </form>
          </div>
        </div>

        {/* Transactions List */}
        <div className="mt-8 bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4">Recent Transactions</h2>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Category</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Description</th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Amount</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {(transactions || []).map((t) => (
                  <tr key={t.id}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{t.date}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{t.category}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{t.description}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-right font-medium">${t.amount.toFixed(2)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
