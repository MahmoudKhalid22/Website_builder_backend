import Plan from "../model/subPlan.js";

// Create a new subscription plan
const newPlan = async (req, res) => {
  try {
    const { name, price, description } = req.body;
    if (!name || typeof price === "undefined" || !description) {
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
    const updates = Object.keys(req.body);
    const fieldsToUpdate = ["name", "price", "description"];

    const isValidUpdates = updates.every((update) =>
      fieldsToUpdate.includes(update)
    );

    if (!isValidUpdates) {
      return res.status(400).send({ error: "No valid updates" });
    }

    const plan = await Plan.findOne({
      _id: req.params.id,
    });
    if (!plan) {
      return res.status(404).send({ error: "the plan is not found" });
    }
    updates.forEach((update) => {
      plan[update] = req.body[update];
    });
    await plan.save();

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
