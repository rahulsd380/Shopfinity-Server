/* eslint-disable @typescript-eslint/no-explicit-any */
import { TProduct } from "./product.interface";
import { sendImageToCloudinary } from "../../utils/sendImageToCloudinary";
import Product from "./product.model";

// Create product
const createProduct = async (payload: TProduct, file: any) => {
  const { name, description, price, category, brand, stock, vendorId } = payload;

  // Check if the file exists
  if (file && file.path) {
    const imageName = name;
    const path = file.path;

    // upload the image to Cloudinary
    const { secure_url } = await sendImageToCloudinary(imageName, path);

    payload.image = secure_url;
  } else {
    throw new Error("Image file is required.");
  }
  const payloadData = {
    name,
    description,
    price,
    category,
    brand,
    stock,
    image: payload.image,
    createdAt: new Date(),
    vendorId,
  };

  const result = await Product.create(payloadData);
  return result;
};

// Get all product with filteration
const getAllProducts = async (page: number, limit: number, search?: string) => {
  const skip = (page - 1) * limit;

  // search filter
  const searchFilter = search
    ? {
      $or: [
        { name: { $regex: search, $options: "i" } },
        { description: { $regex: search, $options: "i" } },
        { brand: { $regex: search, $options: "i" } },
      ],
    }
    : {};

  const [products, totalProducts] = await Promise.all([
    Product.find(searchFilter).skip(skip).limit(limit),
    Product.countDocuments(searchFilter),
  ]);

  return {
    products,
    totalProducts,
  };
};

// Get single product by id
const getSingleProductById = async (productId: string) => {
  const result = await Product.findById(productId);
  return result;
};

// Update product
const updateProduct = async (id: string, payload: Partial<TProduct>, productPic: any) => {
  let productPicUrl: string | undefined;

  if (productPic) {
    const imageName = `${id}-${Date.now()}`;
    const path = productPic.path;

    const { secure_url } = await sendImageToCloudinary(imageName, path);
    productPicUrl = secure_url;
  }

  if (productPicUrl) {
    payload.image = productPicUrl;
  }

  const result = await Product.findByIdAndUpdate(id, payload, {
    new: true,
    runValidators: true,
  });

  return result;
};

// Delete product by id
const deleteProduct = async (productId: string) => {
  const result = await Product.findByIdAndDelete(productId);
  return result;
};


export const ProductServices = {
  createProduct,
  getAllProducts,
  getSingleProductById,
  updateProduct,
  deleteProduct,
  // upvotePost,
  // downvotePost,
  // addComment,
  // editComment,
  // getMostUpvotedPost,
  // deleteComment,
};
