import { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import '../styles/global.css';

const categories = ['food', 'travel', 'shopping', 'bills', 'other'];

export default function ExpenseForm() {
  const { id } = useParams();
  const navigate = useNavigate();
  const isEdit = Boolean(id);

  const [form, setForm] = useState({
    title: '', amount: '', category: 'other', date: new Date().toISOString().split('T')[0], notes: ''
  });

  useEffect(() => {
    if (isEdit) {
      axios.get(`/expenses/${id}`).then(res => {
        const exp = res.data;
        setForm({
          title: exp.title,
          amount: exp.amount,
          category: exp.category,
          date: exp.date.split('T')[0],
          notes: exp.notes || ''
        });
      });
    }
  }, [id, isEdit]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (isEdit) {
        await axios.put(`/expenses/${id}`, form);
      } else {
        await axios.post('/expenses', form);
      }
      navigate('/expenses');
    } catch (err) {
      alert('Error saving expense');
    }
  };

  return (
    <div className="container" style={{ marginTop: '40px' }}>
      <h1 style={{ fontSize: '28px', marginBottom: '24px' }}>{isEdit ? 'Edit' : 'Add New'} Expense</h1>
      <div className="card">
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Title</label>
            <input type="text" value={form.title} onChange={e => setForm({ ...form, title: e.target.value })} required />
          </div>
          <div className="form-group">
            <label>Amount (₹)</label>
            <input type="number" step="0.01" value={form.amount} onChange={e => setForm({ ...form, amount: e.target.value })} required />
          </div>
          <div className="form-group">
            <label>Category</label>
            <select value={form.category} onChange={e => setForm({ ...form, category: e.target.value })}>
              {categories.map(cat => (
                <option key={cat} value={cat}>{cat.charAt(0).toUpperCase() + cat.slice(1)}</option>
              ))}
            </select>
          </div>
          <div className="form-group">
            <label>Date</label>
            <input type="date" value={form.date} onChange={e => setForm({ ...form, date: e.target.value })} required />
          </div>
          <div className="form-group">
            <label>Notes (Optional)</label>
            <textarea rows="4" value={form.notes} onChange={e => setForm({ ...form, notes: e.target.value })} />
          </div>
          <div style={{ display: 'flex', gap: '16px' }}>
            <button type="submit" className="btn btn-primary" style={{ flex: 1, padding: '14px' }}>
              {isEdit ? 'Update' : 'Add'} Expense
            </button>
            <button type="button" onClick={() => navigate('/expenses')} className="btn btn-secondary" style={{ flex: 1, padding: '14px' }}>
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}