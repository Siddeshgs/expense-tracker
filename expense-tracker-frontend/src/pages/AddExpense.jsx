import ExpenseForm from '../components/ExpenseForm';
import ProtectedRoute from '../components/ProtectedRoute';

export default function AddExpense() {
  return (
    <ProtectedRoute>
      <ExpenseForm />
    </ProtectedRoute>
  );
}