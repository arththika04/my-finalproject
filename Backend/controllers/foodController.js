
import Food from "../models/Food.js";

// ✅ CREATE FOOD
export const createFood = async (req, res) => {
  try {
    const food = await Food.create(req.body);
    res.json(food);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// ✅ GET FOOD (USER)
export const getFoods = async (req, res) => {
  try {
    const { category } = req.query;

    const foods = category
      ? await Food.find({ category })
      : await Food.find();

    res.json(foods);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// ✅ DELETE FOOD
export const deleteFood = async (req, res) => {
  try {
    await Food.findByIdAndDelete(req.params.id);
    res.json({ message: "Deleted" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};