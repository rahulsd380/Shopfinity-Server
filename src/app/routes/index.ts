import { Router } from "express";
import { AuthRoute } from "../modules/auth/auth.route";
import { userRoutes } from "../modules/users/users.route";
import { PaymentRoutes } from "../modules/payment/payment.route";
import { ProductRoutes } from "../modules/product/product.route";

const router = Router();

const moduleRoutes = [
  {
    path: "/users",
    route: userRoutes,
  },
  {
    path: "/auth",
    route: AuthRoute,
  },
  {
    path: "/product",
    route: ProductRoutes,
  },
  {
    path: "/payment",
    route: PaymentRoutes,
  },
];

moduleRoutes.forEach((route) => router.use(route.path, route.route));

export default router;
