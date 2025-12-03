import { useEffect, useState } from 'react';
import axios from 'axios';
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from 'recharts';
import { Link } from 'react-router-dom';
import ProtectedRoute from '../components/ProtectedRoute';
import '../styles/global.css';

export default function Dashboard() {
  const [summary, setSummary] = useState({ totalSpent: 0, count: 0, categories: {} });
  const [budgetInfo, setBudgetInfo] = useState({ budget: 0, spent: 0, remaining: 0, exceeded: false });

  // Inside useEffect in Dashboard.jsx
useEffect(() => {
  axios.get('/budget/current').then(res => setBudgetInfo(res.data));
  axios.get('/budget/summary').then(res => setSummary(res.data));  // ← changed from /summary/monthly
}, []);

  const chartData = Object.entries(summary.categories).map(([name, value]) => ({
    name: name.charAt(0).toUpperCase() + name.slice(1),
    value
  }));

  const COLORS = ['#ef4444', '#3b82f6', '#8b5cf6', '#f59e0b', '#6b7280'];

  return (
    <ProtectedRoute>
      <div className="container" style={{ marginTop: '40px' }}>
        <h1 style={{ fontSize: '32px', marginBottom: '24px' }}>Dashboard</h1>

        {budgetInfo.exceeded && (
          <div className="warning-card">
            <h2>Budget Exceeded!</h2>
            <p>You have spent more than your monthly budget.</p>
          </div>
        )}

        <div className="grid-2">
          <div className="budget-card">
            <h2 style={{ fontSize: '24px', marginBottom: '16px' }}>Monthly Budget</h2>
            <p>Budget: ₹{budgetInfo.budget}</p>
            <p>Spent: ₹{budgetInfo.spent}</p>
            <p style={{ fontSize: '28px', marginTop: '16px' }}>Remaining: ₹{budgetInfo.remaining}</p>
          </div>

          <div className="card">
            <h3 style={{ fontSize: '20px', marginBottom: '16px' }}>Spending by Category</h3>
            {chartData.length > 0 ? (
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie data={chartData} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={100} label>
                    {chartData.map((entry, i) => (
                      <Cell key={i} fill={COLORS[i % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            ) : <p>No expenses this month</p>}
          </div>
        </div>

        <div className="card" style={{ textAlign: 'center' }}>
          <Link to="/expenses/new" className="btn btn-primary" style={{ padding: '16px 32px', fontSize: '18px' }}>
            + Add New Expense
          </Link>
        </div>
      </div>
    </ProtectedRoute>
  );
}