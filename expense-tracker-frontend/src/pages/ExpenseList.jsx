import { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import ProtectedRoute from '../components/ProtectedRoute';
import '../styles/global.css';

export default function ExpenseList() {
  const [expenses, setExpenses] = useState([]);
  const [filters, setFilters] = useState({ category: 'all', from: '', to: '' });

  const fetchExpenses = async () => {
    const params = new URLSearchParams();
    if (filters.category !== 'all') params.append('category', filters.category);
    if (filters.from) params.append('from', filters.from);
    if (filters.to) params.append('to', filters.to);

    const res = await axios.get(`/expenses?${params}`);
    setExpenses(res.data);
  };

  useEffect(() => {
    fetchExpenses();
  }, [filters]);

  const handleDelete = async (id) => {
    if (window.confirm('Delete this expense?')) {
      await axios.delete(`/expenses/${id}`);
      setExpenses(expenses.filter(e => e._id !== id));
    }
  };

  const total = expenses.reduce((sum, e) => sum + e.amount, 0);

  return (
    <ProtectedRoute>
      <div className="container" style={{ marginTop: '40px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
          <h1 style={{ fontSize: '28px' }}>All Expenses</h1>
          <Link to="/expenses/new" className="btn btn-primary">+ Add Expense</Link>
        </div>

        <div className="card" style={{ marginBottom: '24px', padding: '16px' }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '16px' }}>
            <div>
              <label className="label">Category</label>
              <select value={filters.category} onChange={e => setFilters({ ...filters, category: e.target.value })}>
                <option value="all">All</option>
                <option value="food">Food</option>
                <option value="travel">Travel</option>
                <option value="shopping">Shopping</option>
                <option value="bills">Bills</option>
                <option value="other">Other</option>
              </select>
            </div>
            <div>
              <label className="label">From</label>
              <input type="date" value={filters.from} onChange={e => setFilters({ ...filters, from: e.target.value })} />
            </div>
            <div>
              <label className="label">To</label>
              <input type="date" value={filters.to} onChange={e => setFilters({ ...filters, to: e.target.value })} />
            </div>
          </div>
        </div>

        <table className="table">
          <thead>
            <tr>
              <th>Date</th>
              <th>Title</th>
              <th>Category</th>
              <th>Amount</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {expenses.map(exp => (
              <tr key={exp._id}>
                <td>{new Date(exp.date).toLocaleDateString()}</td>
                <td>{exp.title}</td>
                <td><span className={`badge badge-${exp.category}`}>{exp.category}</span></td>
                <td>₹{exp.amount.toFixed(2)}</td>
                <td>
                  <Link to={`/expenses/${exp._id}/edit`} style={{ color: '#4f46e5', marginRight: '12px' }}>Edit</Link>
                  <button onClick={() => handleDelete(exp._id)} style={{ color: '#ef4444' }}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
          <tfoot>
            <tr>
              <td colSpan="3" style={{ textAlign: 'right', fontWeight: 'bold' }}>Total</td>
              <td style={{ fontWeight: 'bold' }}>₹{total.toFixed(2)}</td>
              <td></td>
            </tr>
          </tfoot>
        </table>
      </div>
    </ProtectedRoute>
  );
}