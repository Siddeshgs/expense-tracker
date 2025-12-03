// routes/budget.js
import express from 'express';
import { protect } from '../middleware/auth.js';
import {
  setBudget,
  getCurrentBudget,
  getMonthlySummary
} from '../controllers/budgetController.js';

const router = express.Router();

// All routes below require login
router.use(protect);

// POST /budget → set or update monthly budget
router.post('/', setBudget);

// GET /budget/current → returns { budget, spent, remaining, exceeded }
router.get('/current', getCurrentBudget);

// GET /budget/summary → returns monthly total + category breakdown
router.get('/summary', getMonthlySummary);

export default router;