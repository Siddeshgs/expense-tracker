import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import '../styles/global.css';

export default function Navbar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  return (
    <nav>
      <div className="nav-inner container">
        <Link to="/"><h1>ExpenseTracker</h1></Link>
        <div className="links">
          {user ? (
            <>
              <Link to="/dashboard">Dashboard</Link>
              <Link to="/expenses">Expenses</Link>
              <Link to="/budget">Budget</Link>
              <span style={{ marginLeft: '20px' }}>Hi, {user.name}!</span>
              <button className="btn btn-danger" onClick={() => { logout(); navigate('/login'); }}>
                Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/login">Login</Link>
              <Link to="/signup">Signup</Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}