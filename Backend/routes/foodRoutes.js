import express from "express";
import {
  createFood,
  getFoods,
  deleteFood,
} from "../controllers/foodController.js";

const router = express.Router();

router.post("/", createFood);
router.get("/", getFoods);
router.delete("/:id", deleteFood);

export default router;