import httpStatus from "http-status";
import AppError from "../../errors/AppError";
import Product from "../product/product.model";
import Cart from "./cart.model";
import mongoose from "mongoose";

// Add product to cart
const addToCart = async (userId: string, productId: string, quantity: number) => {
    if (!mongoose.Types.ObjectId.isValid(productId)) {
      throw new AppError(httpStatus.BAD_REQUEST, "Invalid product ID");
    }
  
    const product = await Product.findById(productId);
    if (!product) throw new AppError(httpStatus.NOT_FOUND, "Product not found");
  
    // Check if the product already exists in the cart
    let cart = await Cart.findOne({ userId });
    if (!cart) {
      // If no cart exists, create a new one
      cart = new Cart({
        userId,
        items: [
          {
            productId: product._id,
            image: product.images[0],  // Make sure the image is being passed here
            name: product.name,
            category: product.category,
            brand: product.brand,
            stock: product.stock,
            price: product.price,
            quantity,
          },
        ],
        status: "active",
      });
    } else {
      const existingItemIndex = cart.items.findIndex(
        (item) => item.productId.toString() === productId
      );
  
      if (existingItemIndex >= 0) {
        cart.items[existingItemIndex].quantity += quantity;
      } else {
        cart.items.push({
          productId: product._id,
          image: product.images[0],
          name: product.name,
          category: product.category,
          brand: product.brand,
          stock: product.stock,
          price: product.price,
          quantity,
        });
      }
    }
  
    await cart.save();
    return cart;
  };
  

// Get products in the cart
const getCartProducts = async (userId: string) => {
  const result = await Cart.findOne({ userId });
  return result;
};

// Remove product from cart
const removeProductFromCart = async (userId: string, productId: string) => {
  const cart = await Cart.findOne({ userId });
  if (!cart) throw new Error("Cart not found");

  const itemIndex = cart.items.findIndex(
    (item) => item.productId.toString() === productId
  );
  if (itemIndex === -1) throw new Error("Product not found in cart");

  cart.items.splice(itemIndex, 1); // Remove the product from the cart
  await cart.save();
  return cart.items;
};

// Update product quantity in the cart
const updateQuantity = async (userId: string, productId: string, quantity: number) => {
  const cart = await Cart.findOne({ userId });
  if (!cart) throw new AppError(httpStatus.NOT_FOUND, "Cart not found");

  const item = cart.items.find(
    (item) => item.productId.toString() === productId
  );
  if (!item) throw new AppError(httpStatus.NOT_FOUND, "Product not found in cart");

  // Update the quantity
  item.quantity = quantity;

  await cart.save();
  return cart.items;
};

export const CartServices= {
  addToCart,
  getCartProducts,
  removeProductFromCart,
  updateQuantity,
};
