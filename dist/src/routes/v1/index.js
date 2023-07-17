"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const config_1 = __importDefault(require("../../config"));
const home_route_1 = __importDefault(require("./home.route"));
const auth_route_1 = __importDefault(require("./auth.route"));
const product_route_1 = __importDefault(require("./product.route"));
const category_route_1 = __importDefault(require("./category.route"));
const area_route_1 = __importDefault(require("./area.route"));
const role_route_1 = __importDefault(require("./role.route"));
const invoice_route_1 = __importDefault(require("./invoice.route"));
const shop_route_1 = __importDefault(require("./shop.route"));
const dashboard_route_1 = __importDefault(require("./dashboard.route"));
const notification_route_1 = __importDefault(require("./notification.route"));
const router = express_1.default.Router();
const defaultRoutes = [
    {
        path: "/",
        route: home_route_1.default,
    },
    {
        path: "/auth",
        route: auth_route_1.default,
    },
    {
        path: "/product",
        route: product_route_1.default,
    },
    {
        path: "/category",
        route: category_route_1.default,
    },
    {
        path: "/area",
        route: area_route_1.default,
    },
    {
        path: "/role",
        route: role_route_1.default,
    },
    {
        path: "/invoice",
        route: invoice_route_1.default,
    },
    {
        path: "/shop",
        route: shop_route_1.default,
    },
    {
        path: "/dashboard",
        route: dashboard_route_1.default,
    },
    {
        path: "/notification",
        route: notification_route_1.default,
    },
];
const devRoutes = [
    {
        path: "/dev",
        route: home_route_1.default,
    },
];
defaultRoutes.forEach((route) => {
    router.use(route.path, route.route);
});
if (config_1.default.env === "development") {
    devRoutes.forEach((route) => {
        router.use(route.path, route.route);
    });
}
exports.default = router;
//# sourceMappingURL=index.js.map