import mongoose from "mongoose";

const budgetSchema = new mongoose.Schema(
  {
    user_id: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    month: { type: String, required: true }, // YYYY-MM
    amount: { type: Number, required: true }
  },
  { timestamps: true }
);

export default mongoose.model("Budget", budgetSchema);
