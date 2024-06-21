import mongoose from 'mongoose';

const orderSchema = new mongoose.Schema({
    userId: {
        required: true,
        type: String
    },
    items: { type: Array, required: true },
    amount: { type: Number, required: true },
    address: { type: Object, required: true },
    date: { type: Date, default: Date.now() },
    status: { type: String, default: 'Pending' },
    payment: { type: Boolean, default: false }
});

const orderModel = mongoose.model.order || mongoose.model("Order", orderSchema);

export default orderModel;