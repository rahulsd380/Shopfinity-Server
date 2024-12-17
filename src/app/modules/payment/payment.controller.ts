import httpStatus from "http-status";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { PaymentServices } from "./payment.service";

const getAllPaymentHistories = catchAsync(async (req, res) => {
  const result = await PaymentServices.getAllPaymentHistories();
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Payment retrived successfully",
    data: result,
  });
});

const payment = catchAsync(async (req, res) => {
  const result = await PaymentServices.payment(req.body);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Payment created successfully",
    data: result,
  });
});

const paymentConfirmationMessage = catchAsync(async (req, res) => {
  const { transactionId, status } = req.query;
  const result = await PaymentServices.paymentConfirmation(transactionId as string,status as string);
  res.send(result);
});

const getPaymentsBySellerId = catchAsync(async (req, res) => {
  const { sellerId } = req.params;
  const result = await PaymentServices.getPaymentsBySellerId(sellerId);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Payment histories retrieved successfully for the seller",
    data: result,
  });
});


export const PaymentControllers = {
  payment,
  paymentConfirmationMessage,
  getAllPaymentHistories,
  getPaymentsBySellerId,
};
