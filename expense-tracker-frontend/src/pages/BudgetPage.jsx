import { useState, useEffect } from 'react';
import axios from 'axios';
import ProtectedRoute from '../components/ProtectedRoute';
import '../styles/global.css';

export default function BudgetPage() {
  const [budget, setBudget] = useState('');
  const [info, setInfo] = useState({ budget: 0, spent: 0, remaining: 0, exceeded: false });

  useEffect(() => {
    axios.get('/budget/current').then(res => setInfo(res.data));
  }, []);

  const handleSetBudget = async (e) => {
    e.preventDefault();
    await axios.post('/budget', { amount: Number(budget) });
    setInfo(prev => ({ ...prev, budget: Number(budget), remaining: Number(budget) - prev.spent }));
    setBudget('');
  };

  return (
    <ProtectedRoute>
      <div className="container" style={{ marginTop: '40px' }}>
        <h1 style={{ fontSize: '32px', marginBottom: '24px' }}>Monthly Budget</h1>

        <div className="grid-2">
          <div className="card">
            <h2 style={{ fontSize: '24px', marginBottom: '16px' }}>Set Monthly Budget</h2>
            <form onSubmit={handleSetBudget}>
              <div className="form-group">
                <input type="number" placeholder="Enter amount" value={budget} onChange={e => setBudget(e.target.value)} required />
              </div>
              <button type="submit" className="btn btn-primary" style={{ width: '100%', padding: '14px' }}>Set Budget</button>
            </form>
          </div>

          <div className={info.exceeded ? 'warning-card' : 'budget-card'}>
            <h2 style={{ fontSize: '24px', marginBottom: '16px' }}>Current Status</h2>
            <p>Budget: ₹{info.budget}</p>
            <p>Spent: ₹{info.spent}</p>
            <p style={{ fontSize: '28px', marginTop: '16px' }}>Remaining: ₹{info.remaining}</p>
            {info.exceeded && <p style={{ fontSize: '20px', marginTop: '16px' }}>Budget Exceeded!</p>}
          </div>
        </div>
      </div>
    </ProtectedRoute>
  );
}