/* eslint-disable @typescript-eslint/no-explicit-any */
import { TProduct } from "./product.interface";
import { sendImageToCloudinary } from "../../utils/sendImageToCloudinary";
import Product from "./product.model";
import { Types } from "mongoose";
import Vendor from "../vendor/vendor.model";

// Create product
const createProduct = async (payload: TProduct, files: any[]) => {
  const { name, description, price, category, brand, stock, vendorId } = payload;

  const imageUrls: string[] = [];

  // If files are provided, upload them to Cloudinary
  if (files && files.length > 0) {
    for (const file of files) {
      const imageName = `${name}-${Date.now()}`;
      const path = file.path;

      const { secure_url } = await sendImageToCloudinary(imageName, path);
      imageUrls.push(secure_url);
    }
  }

  const payloadData = {
    name,
    description,
    price,
    category,
    brand,
    stock,
    images: imageUrls,
    createdAt: new Date(),
    vendorId,
  };

  // Create the product
  const result = await Product.create(payloadData);

  await Vendor.findOneAndUpdate(
    { userId: vendorId }, // Match the vendor by userId
    { $addToSet: { products: result._id } }, // Add the product's _id to the products array
    { new: true } // Return the updated document
  );
  

  return result;
};


// Add review
const addReview = async (
  productId: string,
  userId: string,
  userName: string,
  rating: number,
  reviewText: string
) => {
  const review = {
    userId: new Types.ObjectId(userId),
    userName,
    reviewId: new Types.ObjectId(),
    rating,
    reviewText,
    reviewDate: new Date(),
  };

 

  const product = await Product.findById(productId);

  if (!product) {
    throw new Error("Product not found");
  }

  product.reviews = product.reviews || [];
  product.reviews.push(review);

  const totalRatings = product.reviews.reduce((sum, review) => sum + review.rating, 0);
  const numberOfReviews = product.reviews.length;

  product.ratings = numberOfReviews > 0 ? totalRatings / numberOfReviews : 0;
  product.ratings = parseFloat(product.ratings.toFixed(1));

  const updatedProduct = await product.save();

  return updatedProduct;
};

// Get all product with filteration
const getAllProducts = async (
  page: number,
  limit: number,
  search?: string,
  category?: string,
  brand?: string,
  rating?: number,
  priceRange?: string
) => {
  const skip = (page - 1) * limit;

  // Search filter
  const searchFilter = search
    ? {
        $or: [
          { name: { $regex: search, $options: "i" } },
          { description: { $regex: search, $options: "i" } },
          { brand: { $regex: search, $options: "i" } },
        ],
      }
    : {};

  // Category filter
  const categoryFilter = category
    ? { category: { $regex: category, $options: "i" } }
    : {};

  // Brand filter
  const brandFilter = brand
    ? { brand: { $regex: brand, $options: "i" } }
    : {};

  // Rating filter (greater than or equal to the specified rating)
  const ratingFilter = rating ? { rating: { $gte: rating } } : {};

  // Price range filter (e.g., "100-500")
  const priceFilter = priceRange
    ? {
        price: {
          $gte: Number(priceRange.split("-")[0]),
          $lte: Number(priceRange.split("-")[1]),
        },
      }
    : {};

  // Combined filters
  const filters = {
    ...searchFilter,
    ...categoryFilter,
    ...brandFilter,
    ...ratingFilter,
    ...priceFilter,
  };

  const [products, totalProducts] = await Promise.all([
    Product.find(filters).skip(skip).limit(limit),
    Product.countDocuments(filters),
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

// Get single product by category
const getProductsByCategory = async (categoryName: string) => {
  const result = await Product.find({category : categoryName});
  return result;
};

// const getMyProducts = async (sellerId: string) => {
//   const result = await Product.find({vendorId:sellerId});
//   return result;
// };

// Get all unique brands
const getAllBrands = async () => {
  const brands = await Product.find({ brand: "brand" });
  return brands;
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
    // Ensure payload.images is an array and append productPicUrl
    payload.images = [...(payload.images || []), productPicUrl];
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
  addReview,
  getAllProducts,
  getSingleProductById,
  getProductsByCategory,
  updateProduct,
  deleteProduct,
  getAllBrands,
  // getMyProducts,
};
