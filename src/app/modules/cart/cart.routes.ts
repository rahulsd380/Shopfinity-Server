import express from "express";
import { CartControllers } from "./cart.controller";

const router = express.Router();

router.post("/add-to-cart/:productId", CartControllers.addToCart);
router.get("/:userId", CartControllers.getCartProducts);
router.delete("/remove-product/:userId/product/:productId", CartControllers.removeProductFromCart);
router.put("/update-quantity/:userId/product/:productId", CartControllers.updateQuantity);

export const CartRoutes = router;
