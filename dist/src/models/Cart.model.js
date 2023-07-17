"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CartSchema = void 0;
const mongoose_1 = require("mongoose");
exports.CartSchema = new mongoose_1.Schema({
    productId: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: "Product",
        require: true,
    },
    quantity: {
        type: Number,
        require: true,
    },
    done: {
        type: Number,
        default: 0,
        validate: [
            function (value) {
                return value <= this.quantity;
            },
        ],
    },
    delivered: {
        type: Number,
        default: 0,
        validate: [
            function (value) {
                return value <= this.done;
            },
        ],
    },
    status: {
        type: String,
        enum: {
            values: ["waitingFood", "finishFood", "finish", "cancel"],
            default: "waitingFood",
            message: "{VALUE} is not supported",
        },
    },
}, {
    _id: false,
});
const _Cart = (0, mongoose_1.model)("Cart", exports.CartSchema);
exports.default = _Cart;
//# sourceMappingURL=Cart.model.js.map