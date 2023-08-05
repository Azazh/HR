import mongoose from "mongoose";

const employeeSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    date_of_birth: {
      type: Date,
      required: true,
    },
    gender: {
      type: String,
      required: true,
    },
    salary: {
      type: Number,
      required: true,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
  },
  {
    timestamps: true,
  }
);

const Employee = mongoose.model("Employee", employeeSchema);

export default Employee;
