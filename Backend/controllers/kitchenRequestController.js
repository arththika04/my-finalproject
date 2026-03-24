import KitchenRequest from "../models/KitchenRequest.js";

const parseArrayField = (value) => {
  if (!value) return [];
  if (Array.isArray(value)) return value;

  try {
    return JSON.parse(value);
  } catch {
    return value
      .split(",")
      .map((item) => item.trim())
      .filter(Boolean);
  }
};

const parsePreferredMealTimes = (value) => {
  if (!value) return [];
  if (Array.isArray(value)) return value;

  try {
    return JSON.parse(value);
  } catch {
    return [];
  }
};

// ✅ CREATE REQUEST
export const createKitchenRequest = async (req, res) => {
  try {
    const {
      age,
      gender,
      weight,
      height,
      phone,
      goal,
      medicalConditions,
      currentMedications,
      dietaryRestrictions,
      digestiveIssues,
      hasAllergies,
      allergyFoods,
      allergyNotes,
      foodPreference,
      mealsPerDay,
      numberOfDays,
      packageType,
      deliveryStartDate,
      preferredMealTimes,
      deliveryAddress,
      additionalNotes,
    } = req.body;

    if (
      !age ||
      !gender ||
      !weight ||
      !height ||
      !phone ||
      !goal ||
      !foodPreference ||
      !mealsPerDay ||
      !numberOfDays ||
      !packageType ||
      !deliveryStartDate ||
      !deliveryAddress
    ) {
      return res.status(400).json({ message: "Required fields are missing" });
    }

    const request = await KitchenRequest.create({
      user: req.user._id,
      age,
      gender,
      weight,
      height,
      phone,
      goal,
      medicalConditions: parseArrayField(medicalConditions),
      currentMedications,
      dietaryRestrictions: parseArrayField(dietaryRestrictions),
      digestiveIssues,
      hasAllergies: hasAllergies === "true" || hasAllergies === true,
      allergyFoods: parseArrayField(allergyFoods),
      allergyNotes,
      foodPreference,
      mealsPerDay,
      numberOfDays,
      packageType,
      deliveryStartDate,
      preferredMealTimes: parsePreferredMealTimes(preferredMealTimes),
      deliveryAddress,
      additionalNotes,
    });

    return res.status(201).json({
      success: true,
      message: "Request created",
      request,
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

// ✅ GET MY REQUESTS
export const getMyKitchenRequests = async (req, res) => {
  try {
    const requests = await KitchenRequest.find({ user: req.user._id }).sort({
      createdAt: -1,
    });

    return res.status(200).json(requests);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

// ✅ GET ALL
export const getAllKitchenRequests = async (req, res) => {
  try {
    const requests = await KitchenRequest.find().sort({ createdAt: -1 });

    return res.status(200).json(requests);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

// ✅ GET SINGLE
export const getKitchenRequestById = async (req, res) => {
  try {
    const request = await KitchenRequest.findById(req.params.id);

    if (!request) {
      return res.status(404).json({ message: "Not found" });
    }

    if (
      req.user.role === "user" &&
      request.user.toString() !== req.user._id.toString()
    ) {
      return res.status(403).json({ message: "Access denied" });
    }

    return res.status(200).json(request);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

// ✅ UPDATE STATUS (🔥 PAYMENT CHECK ADDED)
export const updateKitchenRequestStatus = async (req, res) => {
  try {
    const {
      status,
      kitchenNotes,
      price,
      deliveryPersonName,
      deliveryPersonPhone,
    } = req.body;

    const request = await KitchenRequest.findById(req.params.id);

    if (!request) {
      return res.status(404).json({ message: "Not found" });
    }

    // 🔥 PAYMENT CHECK
    if (
      ["preparing", "out_for_delivery", "delivered"].includes(status) &&
      request.paymentStatus !== "paid"
    ) {
      return res.status(400).json({
        message: "Payment not completed",
      });
    }

    if (status) request.status = status;
    if (kitchenNotes !== undefined) request.kitchenNotes = kitchenNotes;
    if (price !== undefined) request.price = price;
    if (deliveryPersonName) request.deliveryPersonName = deliveryPersonName;
    if (deliveryPersonPhone) request.deliveryPersonPhone = deliveryPersonPhone;

    if (status === "delivered") {
      request.deliveredAt = new Date();
    }

    await request.save();

    return res.status(200).json({
      success: true,
      message: "Updated successfully",
      request,
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

// ✅ CANCEL
export const cancelMyKitchenRequest = async (req, res) => {
  try {
    const request = await KitchenRequest.findById(req.params.id);

    if (!request) {
      return res.status(404).json({ message: "Not found" });
    }

    if (request.user.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: "Access denied" });
    }

    request.status = "cancelled";

    await request.save();

    return res.status(200).json({
      success: true,
      message: "Cancelled",
      request,
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

// ✅ PAYMENT (🔥 FIXED)
export const makePayment = async (req, res) => {
  try {
    const { paymentMethod } = req.body;

    const request = await KitchenRequest.findById(req.params.id);

    if (!request) {
      return res.status(404).json({ message: "Not found" });
    }

    if (request.user.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: "Access denied" });
    }

    if (request.paymentStatus === "paid") {
      return res.status(400).json({ message: "Already paid" });
    }

    // ✅ PAYMENT SUCCESS
    request.paymentStatus = "paid";
    request.paymentMethod = paymentMethod || "cash_on_delivery";
    request.paymentId = "PAY_" + Date.now();
    request.paidAt = new Date(); // 🔥 IMPORTANT FIX

    await request.save();

    return res.status(200).json({
      success: true,
      message: "Payment successful",
      request,
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};