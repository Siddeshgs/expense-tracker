import Budget from "../models/Budget.js";
import Expense from "../models/Expense.js";
import moment from "moment";

const getMonth = () => moment().format("YYYY-MM");

export const setBudget = async (req, res) => {
  const { amount, month } = req.body;
  const m = month || getMonth();

  const budget = await Budget.findOneAndUpdate(
    { user_id: req.user._id, month: m },
    { amount },
    { upsert: true, new: true }
  );

  res.json(budget);
};

export const getCurrentBudget = async (req, res) => {
  const m = getMonth();

  const budget = (await Budget.findOne({ user_id: req.user._id, month: m })) || {
    amount: 0,
  };

  const spent = await Expense.aggregate([
    {
      $match: {
        user_id: req.user._id,
        date: {
          $gte: new Date(moment(`${m}-01`).startOf("month")),
          $lte: new Date(moment(`${m}-01`).endOf("month")),
        },
      },
    },
    { $group: { _id: null, total: { $sum: "$amount" } } },
  ]);

  const totalSpent = spent[0]?.total || 0;

  res.json({
    budget: budget.amount,
    spent: totalSpent,
    remaining: budget.amount - totalSpent,
    exceeded: totalSpent > budget.amount,
  });
};

export const getMonthlySummary = async (req, res) => {
  const m = getMonth();

  const summary = await Expense.aggregate([
    {
      $match: {
        user_id: req.user._id,
        date: {
          $gte: new Date(moment(`${m}-01`).startOf("month")),
          $lte: new Date(moment(`${m}-01`).endOf("month")),
        },
      },
    },
    {
      $group: {
        _id: null,
        total: { $sum: "$amount" },
        count: { $sum: 1 },
      },
    },
  ]);

  const categories = await Expense.aggregate([
    {
      $match: {
        user_id: req.user._id,
        date: {
          $gte: new Date(moment(`${m}-01`).startOf("month")),
          $lte: new Date(moment(`${m}-01`).endOf("month")),
        },
      },
    },
    {
      $group: { _id: "$category", total: { $sum: "$amount" } },
    },
  ]);

  res.json({
    totalSpent: summary[0]?.total || 0,
    count: summary[0]?.count || 0,
    categories: categories.reduce((obj, c) => ({ ...obj, [c._id]: c.total }), {}),
  });
};
