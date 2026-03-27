import Appointment from "../models/Appointment.js";

export const createAppointment = async (req, res) => {
  try {
    const { dietician, date, time } = req.body;

    const appointment = await Appointment.create({
      user: req.user._id,
      dietician,
      date,
      time,
    });

    res.status(201).json(appointment);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: err.message });
  }
};

export const getMyAppointments = async (req, res) => {
  try {
    const data = await Appointment.find({ user: req.user._id })
      .populate("dietician", "username email");

    res.json(data);
  } catch (err) {
    res.status(500).json({ message: "Error fetching appointments" });
  }
};