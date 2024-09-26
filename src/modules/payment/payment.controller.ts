import { Request, Response } from "express";
import catchAsync from "../../utils/catchAsync";
import { paymentService } from "./payment.service";

const confirmationController = catchAsync(
  async (req: Request, res: Response) => {
    const { transactionId, status } = req.query;
    console.log("Transaction ID:", transactionId);
    console.log("Status:", status);
    const result = await paymentService.confirmationService(
      transactionId as string,
      status as string
    );

    res.send(result ? generateSuccessHtml() : generateFailureHtml());
  }
);

const generateSuccessHtml = () => `
  <html>
    <head>
      <title>Payment Successful</title>
      <style>
        body {
          font-family: Arial, sans-serif;
          background-color: #f0f8f5;
          display: flex;
          justify-content: center;
          align-items: center;
          height: 100vh;
          margin: 0;
        }
        .container {
          text-align: center;
          background-color: #ffffff;
          padding: 40px;
          border-radius: 10px;
          box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
        }
        h1 {
          color: #4CAF50;
        }
        p {
          font-size: 18px;
          color: #333;
        }
        a {
          text-decoration: none;
          color: #ffffff;
          background-color: #4CAF50;
          padding: 10px 20px;
          border-radius: 5px;
          transition: background-color 0.3s ease;
        }
        a:hover {
          background-color: #45a049;
        }
        .icon {
          font-size: 50px;
          color: #4CAF50;
          margin-bottom: 20px;
        }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="icon">✔️</div>
        <h1>Payment Successful!</h1>
        <p>Thank you for your payment. Your transaction was successful.</p>
        <a href="https://car-wash-booking-system-eight.vercel.app/">Back to Homepage</a>
      </div>
    </body>
  </html>
`;

const generateFailureHtml = () => `
  <html>
    <head>
      <title>Payment Failed</title>
      <style>
        body {
          font-family: Arial, sans-serif;
          background-color: #fff4f4;
          display: flex;
          justify-content: center;
          align-items: center;
          height: 100vh;
          margin: 0;
        }
        .container {
          text-align: center;
          background-color: #ffffff;
          padding: 40px;
          border-radius: 10px;
          box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
        }
        h1 {
          color: #f44336;
        }
        p {
          font-size: 18px;
          color: #333;
        }
        a {
          text-decoration: none;
          color: #ffffff;
          background-color: #f44336;
          padding: 10px 20px;
          border-radius: 5px;
          transition: background-color 0.3s ease;
        }
        a:hover {
          background-color: #d32f2f;
        }
        .icon {
          font-size: 50px;
          color: #f44336;
          margin-bottom: 20px;
        }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="icon">❌</div>
        <h1>Payment Failed!</h1>
        <p>There was an issue processing your payment. Please try again.</p>
        <a href="https://car-wash-booking-system-eight.vercel.app/">Back to Homepage</a>
      </div>
    </body>
  </html>
`;

export const paymentController = { confirmationController };
