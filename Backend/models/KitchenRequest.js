import mongoose from "mongoose";

const preferredMealTimeSchema = new mongoose.Schema(
  {
    mealType: {
      type: String,
      enum: ["breakfast", "lunch", "snack", "dinner"],
      required: true,
    },
    time: {
      type: String,
      required: true,
    },
  },
  { _id: false }
);

const kitchenRequestSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    // ================= BASIC INFO =================
    age: {
      type: Number,
      required: true,
    },
    gender: {
      type: String,
      enum: ["male", "female", "other"],
      required: true,
    },
    weight: {
      type: Number,
      required: true,
    },
    height: {
      type: Number,
      required: true,
    },
    phone: {
      type: String,
      required: true,
    },

    // ================= HEALTH DETAILS =================
    goal: {
      type: String,
      required: true,
    },

    medicalConditions: {
      type: [String],
      default: [],
    },

    currentMedications: {
      type: String,
      default: "",
    },

    dietaryRestrictions: {
      type: [String],
      default: [],
    },

    digestiveIssues: {
      type: String,
      default: "",
    },

    // ================= ALLERGY =================
    hasAllergies: {
      type: Boolean,
      default: false,
    },

    allergyFoods: {
      type: [String],
      default: [],
    },

    allergyNotes: {
      type: String,
      default: "",
    },

    allergyReportUrl: {
      type: String,
      default: "",
    },

    // ================= PACKAGE =================
    foodPreference: {
      type: String,
      enum: ["veg", "non-veg", "vegan", "other"],
      required: true,
    },

    mealsPerDay: {
      type: Number,
      required: true,
      min: 1,
      max: 6,
    },

    numberOfDays: {
      type: Number,
      required: true,
      min: 1,
    },

    packageType: {
      type: String,
      enum: ["weekly", "monthly", "custom"],
      required: true,
    },

    deliveryStartDate: {
      type: Date,
      required: true,
    },

    preferredMealTimes: {
      type: [preferredMealTimeSchema],
      default: [],
    },

    deliveryAddress: {
      type: String,
      required: true,
    },

    additionalNotes: {
      type: String,
      default: "",
    },

    // ================= ORDER STATUS =================
    status: {
      type: String,
      enum: [
        "pending",
        "reviewing",
        "approved",
        "rejected",
        "preparing",
        "out_for_delivery",
        "delivered",
        "cancelled",
      ],
      default: "pending",
    },

    kitchenNotes: {
      type: String,
      default: "",
    },

    price: {
      type: Number,
      default: 0,
    },

    estimatedDeliveryTime: {
      type: String,
      default: "",
    },

    deliveryPersonName: {
      type: String,
      default: "",
    },

    deliveryPersonPhone: {
      type: String,
      default: "",
    },

    deliveredAt: {
      type: Date,
      default: null,
    },

    // ================= 💰 PAYMENT =================
    paymentStatus: {
      type: String,
      enum: ["pending", "paid", "failed", "refunded"],
      default: "pending",
    },

    paymentMethod: {
      type: String,
      enum: ["cash_on_delivery", "card", "online"],
      default: "cash_on_delivery",
    },

    paymentId: {
      type: String,
      default: "",
    },

    paidAt: {
      type: Date,
      default: null,
    },


    
  },
  { timestamps: true }
);



const KitchenRequest = mongoose.model("KitchenRequest", kitchenRequestSchema);

export default KitchenRequest;