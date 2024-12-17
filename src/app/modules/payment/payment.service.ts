/* eslint-disable @typescript-eslint/no-unused-vars */
import { User } from "../auth/auth.model";
import Cart from "../cart/cart.model";
import { TPayment } from "./payment.interface";
import Payment from "./payment.model";
import { initiatePayment, verifypayment } from "./payment.utils";

// Get all payments
const getAllPaymentHistories = async () => {
  const result = await Payment.find();
  return result;
}

// Make payment
const payment = async (payload: TPayment & { productIds: string[] }) => {
  const transactionId = `TNX-${Date.now()}-${payload.email}`;

  // Create a new payment record
  const payment = new Payment({
    sellerIds : payload.sellerIds,
    name: payload.name,
    email: payload.email,
    phoneNumber: payload.phoneNumber,
    userId: payload.userId,
    amount: payload.amount,
    address: payload.address,
    streetAddress: payload.streetAddress,
    country: payload.country,
    state: payload.state,
    zipCode: payload.zipCode,
    altPhoneNumber: payload.altPhoneNumber,
    transactionId,
    status: "pending"
  });
  await payment.save();

  await User.findByIdAndUpdate(
    payload.userId,
    {
      $push: { orders: { $each: payload.productIds } },
    },
    { new: true }
  );

  // Empty the user's cart
  await Cart.findOneAndUpdate(
    { userId: payload.userId },
    { $set: { items: [] } },
    { new: true }
  );

  const paymentData = {
    transactionId,
    amount: payload.amount,
    sellerIds : payload.sellerIds,
    name: payload.name,
    email: payload.email,
    phoneNumber: payload.phoneNumber,
    userId: payload.userId,
    address: payload.address,
    streetAddress: payload.streetAddress,
    country: payload.country,
    state: payload.state,
    zipCode: payload.zipCode,
    altPhoneNumber: payload.altPhoneNumber,
    status : "pending"
  };

  const paymentSession = await initiatePayment(paymentData);
  return paymentSession;
};


// Payment confirmation message
const paymentConfirmation = async (transactionId: string, status: string) => {
  const verifyResponse = await verifypayment(transactionId);
  console.log(verifyResponse);
  
  let result;
  if (verifyResponse && verifyResponse.pay_status === "Successful") {
    result = await User.findOneAndUpdate(
      { transactionId },
      {
        isVerified: true,
      }
    );
  }

  return `<h1>Payment ${status}</h1>`;
};

const getPaymentsBySellerId = async (sellerId: string) => {
  const result = await Payment.find({ sellerIds: sellerId });
  return result;
};

export const PaymentServices = {
  payment,
  paymentConfirmation,
  getAllPaymentHistories,
  getPaymentsBySellerId,
};
