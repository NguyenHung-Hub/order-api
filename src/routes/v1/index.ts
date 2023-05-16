import express from "express";

import config from "../../config";
import homeRoute from "./home.route";
import authRoute from "./auth.route";
import productRoute from "./product.route";
import categoryRoute from "./category.route";
import areaRoute from "./area.route";
import roleRoute from "./role.route";

const router = express.Router();

const defaultRoutes = [
    {
        path: "/",
        route: homeRoute,
    },
    {
        path: "/auth",
        route: authRoute,
    },
    {
        path: "/product",
        route: productRoute,
    },
    {
        path: "/category",
        route: categoryRoute,
    },
    {
        path: "/area",
        route: areaRoute,
    },
    {
        path: "/role",
        route: roleRoute,
    },
];
const devRoutes = [
    {
        path: "/dev",
        route: homeRoute,
    },
];

defaultRoutes.forEach((route) => {
    router.use(route.path, route.route);
});

if (config.env === "development") {
    devRoutes.forEach((route) => {
        router.use(route.path, route.route);
    });
}

export default router;
