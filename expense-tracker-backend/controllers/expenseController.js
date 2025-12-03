import Expense from "../models/Expense.js";

export const addExpense = async (req, res) => {
  const { title, amount, category, date, notes } = req.body;

  const expense = await Expense.create({
    user_id: req.user._id,
    title,
    amount,
    category,
    date: date || Date.now(),
    notes,
  });

  res.status(201).json(expense);
};

export const getExpenses = async (req, res) => {
  const { category, from, to } = req.query;

  let query = { user_id: req.user._id };

  if (category) query.category = category;
  if (from || to) {
    query.date = {};
    if (from) query.date.$gte = new Date(from);
    if (to) query.date.$lte = new Date(to);
  }

  const expenses = await Expense.find(query).sort({ date: -1 });
  res.json(expenses);
};

export const updateExpense = async (req, res) => {
  const expense = await Expense.findById(req.params.id);

  if (!expense) return res.status(404).json({ message: "Not found" });
  if (expense.user_id.toString() !== req.user._id.toString())
    return res.status(403).json({ message: "Not authorized" });

  const updated = await Expense.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json(updated);
};

export const deleteExpense = async (req, res) => {
  const expense = await Expense.findById(req.params.id);

  if (!expense) return res.status(404).json({ message: "Not found" });
  if (expense.user_id.toString() !== req.user._id.toString())
    return res.status(403).json({ message: "Not authorized" });

  await expense.deleteOne();
  res.json({ message: "Deleted" });
};
