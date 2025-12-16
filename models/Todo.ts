import mongoose from "mongoose";

const TodoSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true },
    userId: { type: String, required: true },
    status: {
      type: String,
      enum: ["todo", "doing", "done"],
      default: "todo",
    },
    time: { type: String }, // optional, e.g., "2h" or "10-13 Jul"
  },
  { timestamps: true }
);

export default mongoose.models.Todo || mongoose.model("Todo", TodoSchema);
