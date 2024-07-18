import mongoose from 'mongoose';
const { Schema } = mongoose;

const moduleSchema = new Schema({
    moduleCode: { type: String, required: true },
    title: { type: String, required: true }
});

const todoSchema = new Schema({
  text: { type: String, required: true },
  completed: { type: Boolean, default: false },
});

const userSchema = new Schema(
  {
    name: {
      type: String,
      trim: true,
      required: true,
    },
    email: {
      type: String,
      trim: true,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
      min: 6,
      max: 64,
    },
    role: {
      type: String,
      default: "Subscriber",
    },
    image: {
      public_id: "",
      url: "",
    },
    resetCode: "",
    modules: [moduleSchema],
    todos: [todoSchema],
  },
  { timestamps: true },
);

export default mongoose.model("User", userSchema);
