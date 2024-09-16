import { ZodError } from "zod";
import config from "../config";
import AppError from "../error/AppError";
import { CastErrorHandler } from "../error/castErrorHandler";
import { MongooseErrorHandler } from "../error/mongooseErrorHandler";
import { ZodErrorHandler } from "../error/zodErrorHandler";
import { TErrorSources } from "../interface/error.interface";
import { ErrorRequestHandler } from "express";
import DuplicateErrorHandler from "../error/DuplicateErrorHandler";

const globalErrorHandler: ErrorRequestHandler = (err, req, res) => {
    //setting default values
    let statusCode = 500;
    let message = 'Something went wrong!';
    let errorSources: TErrorSources = [
      {
        path: '',
        message: 'Something went wrong',
      },
    ];
  
    if (err instanceof ZodError) {
      const simplifiedError = ZodErrorHandler(err);
      statusCode = simplifiedError?.statusCode;
      message = simplifiedError?.message;
      errorSources = simplifiedError?.errorSources;
    } else if (err?.name === 'ValidationError') {
      const simplifiedError = MongooseErrorHandler(err);
      statusCode = simplifiedError?.statusCode;
      message = simplifiedError?.message;
      errorSources = simplifiedError?.errorSources;
    } else if (err?.name === 'CastError') {
      const simplifiedError = CastErrorHandler(err);
      statusCode = simplifiedError?.statusCode;
      message = simplifiedError?.message;
      errorSources = simplifiedError?.errorSources;
    } else if (err?.code === 11000) {
      const simplifiedError = DuplicateErrorHandler(err);
      statusCode = simplifiedError?.statusCode;
      message = simplifiedError?.message;
      errorSources = simplifiedError?.errorSources;
    } else if (err instanceof AppError) {
      statusCode = err?.statusCode;
      message = err.message;
      errorSources = [
        {
          path: '',
          message: err?.message,
        },
      ];
    } else if (err instanceof Error) {
      message = err.message;
      errorSources = [
        {
          path: '',
          message: err?.message,
        },
      ];
    }
  
    //ultimate return
    return res.status(statusCode).json({
      success: false,
      message,
      errorSources,
      err,
      stack: config.NODE_DEV === 'development' ? err?.stack : null,
    });
  };
  
  export default globalErrorHandler;
  
  //pattern
  /*
  success
  message
  errorSources:[
    path:'',
    message:''
  ]
  stack
  */