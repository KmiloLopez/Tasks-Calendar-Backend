import mongoose from "mongoose";
//models and how we save on mongoose
const taskSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    priority: {
      type: String,
      required: true,
    },
    time: {
      type: String,
      required: true,
    },
    timeout: {
      type: String,
      required: true,
    },
    status: {
      type: Boolean,
      required: true,
    },
    date: {
      type: Date,
      default: Date.now,
    },
    user: {
      type: mongoose.Types.ObjectId,//id de mongodb para identificar a quien perteenece la tarea
      ref: "User",
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("Task", taskSchema);