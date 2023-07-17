"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const catchAsync = (fn) => (req, res, next) => {
    Promise.resolve(fn(req, res, next)).catch((err) => {
        console.log(`>> Error: `, err);
        next(err);
    });
};
exports.default = catchAsync;
//# sourceMappingURL=catchAsync.js.map