
// import mongoose from "mongoose";
// const { Schema } = mongoose;

// const userSchema = new Schema(
//   {
//     name: {
//       type: String,
//       trim: true,
//       required: true,
//     },
//     email: {
//       type: String,
//       trim: true,
//       required: true,
//       unique: true,
//     },
//     password: {
//       type: String,
//       required: true,
//       min: 6,
//       max: 64,
//     },
//     role: {
//       type: String,
//       default: "Subscriber",
//     },
//     image: {
//       public_id: "",
//       url: "",
//     },
//     resetCode: "",
//     modules: [{
//       type: Schema.Types.ObjectId,
//       ref: 'Module',
//     }],
//   },
//   { timestamps: true },
// );

// export default mongoose.model("User", userSchema);

import mongoose from 'mongoose';
const { Schema } = mongoose;

const moduleSchema = new Schema({
    moduleCode: { type: String, required: true },
    title: { type: String, required: true }
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
  },
  { timestamps: true },
);

export default mongoose.model("User", userSchema);
