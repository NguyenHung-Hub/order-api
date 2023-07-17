"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const Cart_model_1 = require("./Cart.model");
const InvoiceScheme = new mongoose_1.Schema({
    shopId: {
        type: mongoose_1.Schema.Types.ObjectId,
        required: true,
        ref: "Shop",
    },
    customerId: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: "User",
    },
    waiterId: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: "User",
    },
    customerName: {
        type: String,
        default: "",
    },
    customerPhone: {
        type: String,
        default: "",
    },
    status: {
        type: String,
        enum: {
            values: [
                "waitingConfirm",
                "serving",
                "delivered",
                "finish",
                "cancel",
            ],
            default: "waitingConfirm",
            message: "{VALUE} is not supported",
        },
    },
    items: [Cart_model_1.CartSchema],
    area: {
        areaId: { type: mongoose_1.Schema.Types.ObjectId, ref: "Area" },
        tableId: { type: mongoose_1.Schema.Types.ObjectId },
    },
}, {
    timestamps: true,
});
const _Invoice = (0, mongoose_1.model)("Invoice", InvoiceScheme);
exports.default = _Invoice;
//# sourceMappingURL=Invoice.model.js.map