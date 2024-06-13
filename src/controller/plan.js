import Plan from "../model/subPlan.js";

// Create a new subscription plan
const newPlan = async (req, res) => {
  try {
    const { name, price, description } = req.body;
    if (!name || !price || !description) {
      return res.status(400).send({
        error: "you must enter all details (name, price, description)",
      });
    }
    const plan = await Plan.create(req.body);
    res.status(201).json({ message: "plan has been added successfully" });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Get all subscription plans
const getAllPlans = async (req, res) => {
  try {
    const plans = await Plan.find();
    res.json(plans);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Update a subscription plan
const updatePlan = async (req, res) => {
  try {
    const plan = await Plan.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    res.json({ plan });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Delete a subscription plan
const deletePlan = async (req, res) => {
  try {
    await Plan.findByIdAndDelete(req.params.id);
    res.json({ message: "Subscription plan deleted" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export { newPlan, getAllPlans, updatePlan, deletePlan };
