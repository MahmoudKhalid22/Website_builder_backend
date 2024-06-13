import { mongoose } from "mongoose";

const subscriptionPlanSchema = new mongoose.Schema(
  {
    name: {
      type: String,
    },
    price: {
      type: Number,
      require: [true, "you must provide a price number or 0"],
    },
    description: {
      type: Array,
    },
  },
  {
    timestamps: true,
  }
);

subscriptionPlanSchema.methods.toJSON = function () {
  const plan = this;
  const planObj = plan.toObject();

  delete planObj.updatedAt;
  delete planObj.__v;

  return planObj;
};

const Plan = mongoose.model("Plan", subscriptionPlanSchema);

export default Plan;
