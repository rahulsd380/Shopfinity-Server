import { Request, Response } from "express";
import httpStatus from "http-status";
import sendResponse from "../../utils/sendResponse";
import { CartServices } from "./cart.service";

// Add product to cart
const addToCart = async (req: Request, res: Response) => {
    try {
      const { userId, quantity } = req.body;
      const { productId } = req.params;
      const result = await CartServices.addToCart(userId, productId, quantity);
  
      sendResponse(res, {
        statusCode: httpStatus.CREATED,
        success: true,
        message: "Product added to cart successfully",
        data: result,
      });
    } catch (error) {
      console.error(error); // Log error for debugging
      sendResponse(res, {
        statusCode: httpStatus.INTERNAL_SERVER_ERROR,
        success: false,
        message: error.message || "Something went wrong",
      });
    }
  };
  

// Get all products in the cart
const getCartProducts = async (req: Request, res: Response) => {
    const { userId } = req.params;
    const result = await CartServices.getCartProducts(userId);
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "Cart products fetched successfully",
        data: result,
    });
};

// Remove product from cart
const removeProductFromCart = async (req: Request, res: Response) => {
    const { userId, productId } = req.params;
    const result = await CartServices.removeProductFromCart(userId, productId);
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "Product removed from cart successfully",
        data: result,
    });
};

// Update product quantity in the cart
const updateQuantity = async (req: Request, res: Response) => {
    const { userId, productId } = req.params;
    const { quantity } = req.body;
    const result = await CartServices.updateQuantity(userId, productId, quantity);
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "Product quantity updated successfully",
        data: result,
    });
};

export const CartControllers = {
    addToCart,
    getCartProducts,
    removeProductFromCart,
    updateQuantity,
};
