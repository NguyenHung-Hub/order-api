import express from "express";

import config from "../../config";
import homeRoute from "./home.route";
import authRoute from "./auth.route";

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
