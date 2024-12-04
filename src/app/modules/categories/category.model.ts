import mongoose, { Schema } from "mongoose";

const CategorySchema: Schema = new Schema({
    name: { type: String, required: true, trim: true },
    description: { type: String, trim: true },
    image: { type: String, trim: true },
}, {
    timestamps: true
});

export const Category = mongoose.model("Category", CategorySchema);
