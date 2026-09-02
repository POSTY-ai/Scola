const mongoose = require("mongoose");

const paymentRequestSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    email: { type: String, required: true },
    tier: { type: String, enum: ["pro", "ia"], required: true },
    montant: { type: Number, required: true },
    screenshot: {
        data: { type: String, required: true },
        type: { type: String, required: true },
        name: { type: String, required: true }
    },
    status: {
        type: String,
        enum: ["pending", "approved", "rejected"],
        default: "pending"
    },
    processedAt: { type: Date, default: null },
    processedBy: { type: String, default: null },
    rejectionReason: { type: String, default: null }
}, { timestamps: true });

module.exports = mongoose.model("PaymentRequest", paymentRequestSchema);