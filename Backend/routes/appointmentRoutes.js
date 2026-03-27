import express from "express";
import {
  createAppointment,
  getMyAppointments,
} from "../controllers/appointmentController.js";

import { protect } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.post("/", protect, createAppointment);
router.get("/my", protect, getMyAppointments);

export default router;