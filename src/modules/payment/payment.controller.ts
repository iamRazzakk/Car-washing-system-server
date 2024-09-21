import { Request, Response } from "express";
import catchAsync from "../../utils/catchAsync";

const confirmationController = catchAsync(
  async (req: Request, res: Response) => {
    const htmlResponse = `
    <html>
    <head>
        <title>Payment Successful</title>
        <style>
            body {
                font-family: 'Helvetica Neue', Arial, sans-serif;
                background-color: #f4f4f4;
                color: #333;
                display: flex;
                justify-content: center;
                align-items: center;
                height: 100vh;
                margin: 0;
                padding: 20px;
                box-sizing: border-box;
            }
            .container {
                text-align: center;
                background-color: white;
                border-radius: 15px;
                box-shadow: 0 8px 30px rgba(0, 0, 0, 0.1);
                padding: 50px 30px;
                width: 350px;
                transition: box-shadow 0.3s, transform 0.3s;
            }
            .container:hover {
                box-shadow: 0 12px 40px rgba(0, 0, 0, 0.2);
                transform: translateY(-5px);
            }
            h1 {
                color: #517de9;
                font-size: 2.2em;
                margin-bottom: 20px;
                font-weight: bold;
            }
            p {
                margin: 15px 0;
                font-size: 1.1em;
                line-height: 1.6;
            }
            .btn {
                background-color: #517de9;
                color: white;
                padding: 12px 18px;
                border: none;
                border-radius: 5px;
                cursor: pointer;
                text-decoration: none;
                font-size: 1em;
                transition: background-color 0.3s, transform 0.3s;
            }
            .btn:hover {
                background-color: #475cbf;
                transform: scale(1.05);
            }
            @media (max-width: 480px) {
                .container {
                    width: 90%;
                }
                h1 {
                    font-size: 1.8em;
                }
            }
        </style>
    </head>
    <body>
        <div class="container">
            <h1>Payment Successful!</h1>
            <p>Your payment has been processed successfully.</p>
            <p>Thank you for choosing us!</p>
            <a href="/" class="btn">Back to Homepage</a>
        </div>
    </body>
    </html>
    `;

    res.send(htmlResponse);
  }
);

export const paymentController = { confirmationController };
