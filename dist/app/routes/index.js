"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_route_1 = require("../modules/auth/auth.route");
const users_route_1 = require("../modules/users/users.route");
const payment_route_1 = require("../modules/payment/payment.route");
const product_route_1 = require("../modules/product/product.route");
const category_route_1 = require("../modules/categories/category.route");
const vendor_routes_1 = require("../modules/vendor/vendor.routes");
const cart_routes_1 = require("../modules/cart/cart.routes");
const router = (0, express_1.Router)();
const moduleRoutes = [
    {
        path: "/user",
        route: users_route_1.userRoutes,
    },
    {
        path: "/auth",
        route: auth_route_1.AuthRoute,
    },
    {
        path: "/product",
        route: product_route_1.ProductRoutes,
    },
    {
        path: "/payment",
        route: payment_route_1.PaymentRoutes,
    },
    {
        path: "/category",
        route: category_route_1.CategoryRoutes,
    },
    {
        path: "/seller",
        route: vendor_routes_1.SellerRoutes,
    },
    {
        path: "/cart",
        route: cart_routes_1.CartRoutes,
    },
];
moduleRoutes.forEach((route) => router.use(route.path, route.route));
exports.default = router;
