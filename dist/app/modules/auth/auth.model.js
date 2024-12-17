"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = void 0;
const mongoose_1 = require("mongoose");
const bcrypt_1 = __importDefault(require("bcrypt"));
const config_1 = __importDefault(require("../../config"));
const userSchema = new mongoose_1.Schema({
    name: {
        type: String,
        required: true,
        trim: true,
        maxlength: 100,
    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        lowercase: true,
    },
    password: {
        type: String,
        required: true,
    },
    role: {
        type: String,
        enum: ["user", "admin", "vendor", "seller"],
        default: "user",
    },
    isVerified: {
        type: Boolean,
        default: false,
    },
    avatar: {
        type: String,
    },
    address: {
        street: String,
        city: String,
        state: String,
        country: String,
        zipCode: String,
    },
    isDeleted: { type: Boolean, default: false },
    isSuspended: { type: Boolean, default: false },
    contactNumber: {
        type: String,
        trim: true,
    },
    orders: [
        {
            type: mongoose_1.Types.ObjectId,
            ref: "Product",
        },
    ],
    wishlist: [
        {
            type: mongoose_1.Types.ObjectId,
            ref: "Product",
        },
    ],
    followings: { type: [String], default: [] }
}, {
    timestamps: true,
});
userSchema.pre("save", function (next) {
    return __awaiter(this, void 0, void 0, function* () {
        this.password = yield bcrypt_1.default.hash(this.password, Number(config_1.default.bcrypt_salt_round));
        next();
    });
});
userSchema.post("save", function (doc, next) {
    doc.password = "";
    next();
});
userSchema.statics.isUserExists = function (email) {
    return __awaiter(this, void 0, void 0, function* () {
        return yield this.findOne({ email });
    });
};
userSchema.statics.isPasswordMatched = function (plainTextPassword, hashedPassword) {
    return __awaiter(this, void 0, void 0, function* () {
        return yield bcrypt_1.default.compare(plainTextPassword, hashedPassword);
    });
};
exports.User = (0, mongoose_1.model)("User", userSchema);
