import { Router } from "express";
import { AuthRoute } from "../modules/auth/auth.route";
import { userRoutes } from "../modules/users/users.route";
import { PaymentRoutes } from "../modules/payment/payment.route";
import { ProductRoutes } from "../modules/product/product.route";
import { CategoryRoutes } from "../modules/categories/category.route";
import { VendorRoutes } from "../modules/vendor/vendor.routes";

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
  {
    path: "/category",
    route: CategoryRoutes,
  },
  {
    path: "/vendor",
    route: VendorRoutes,
  },
];

moduleRoutes.forEach((route) => router.use(route.path, route.route));

export default router;
