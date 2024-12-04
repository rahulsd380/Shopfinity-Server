/* eslint-disable @typescript-eslint/no-explicit-any */
import { TCategory } from "./category.interface";
import { sendImageToCloudinary } from "../../utils/sendImageToCloudinary"
import { Category } from "./category.model";

// Create category
const createCategory = async (payload: TCategory, file: any) => {
    const { name, description } = payload;

    if (file && file.path) {
        const imageName = name;
        const path = file.path;

        // Upload the image to Cloudinary
        const { secure_url } = await sendImageToCloudinary(imageName, path);

        payload.image = secure_url;
    } else {
        throw new Error("Image file is required.");
    }

    const payloadData = {
        name,
        description,
        image: payload.image,
        createdAt: new Date(),
    };

    const result = await Category.create(payloadData);
    return result;
};

// Get all categories with filtering
const getAllCategories = async (page: number, limit: number, search?: string) => {
    const skip = (page - 1) * limit;

    const searchFilter = search
        ? {
            $or: [{ name: { $regex: search, $options: "i" } }],
        }
        : {};

    const [categories, totalCategories] = await Promise.all([
        Category.find(searchFilter).skip(skip).limit(limit),
        Category.countDocuments(searchFilter),
    ]);

    return {
        categories,
        totalCategories,
    };
};

// Get single category by ID
const getSingleCategoryById = async (categoryId: string) => {
    const result = await Category.findById(categoryId);
    return result;
};

// Update category
const updateCategory = async (id: string, payload: Partial<TCategory>, categoryPic: any) => {
    let categoryPicUrl: string | undefined;

    if (categoryPic) {
        const imageName = `${id}-${Date.now()}`;
        const path = categoryPic.path;

        const { secure_url } = await sendImageToCloudinary(imageName, path);
        categoryPicUrl = secure_url;
    }

    if (categoryPicUrl) {
        payload.image = categoryPicUrl;
    }

    const result = await Category.findByIdAndUpdate(id, payload, {
        new: true,
        runValidators: true,
    });

    return result;
};

// Delete category by ID
const deleteCategory = async (categoryId: string) => {
    const result = await Category.findByIdAndDelete(categoryId);
    return result;
};

export const CategoryServices = {
    createCategory,
    getAllCategories,
    getSingleCategoryById,
    updateCategory,
    deleteCategory,
};
