import dotenv from "dotenv";
dotenv.config();

export default {
  port: process.env.PORT,
  db_url: process.env.DB_URL,
  bcrypt_salt_round : process.env.BCRYPT_SALT_ROUND,
  node_env: process.env.NODE_ENV,
  jwt_access_secret: process.env.JWT_ACCESS_SECRET,
  jwt_refresh_secret: process.env.JWT_REFRESH_SECRET,
  jwt_access_expires_in: process.env.JWT_ACCESS_EXPIRES_IN,
  jwt_refresh_expires_in: process.env.JWT_REFRESH_EXPIRES_IN,
  cloudinary_cloud_name:process.env.CLOUDINARY_CLOUD_NAME,
  cloudinary_api_key:process.env.CLOUDINARY_API_KEY,
  cloudinary_api_secret:process.env.CLOUDINARY_API_SCERET,
  aamarpay_store_id:process.env.STORE_ID,
  aamarpay_signature_key:process.env.SIGNATURE_KEY,
  aamarpay_payment_url:process.env.PAYMENT_URL,
  payment_verify_url:process.env.PAYMENT_VERIFY_URL,
  reset_password_ui_url:process.env.RESET_PASSWORD_UI_URL,
};