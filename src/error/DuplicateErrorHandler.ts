import { IErrorResponse, TErrorSources } from "../interface/error.interface";


// eslint-disable-next-line @typescript-eslint/no-explicit-any
const DuplicateErrorHandler = (err: any): IErrorResponse => {
  // Extract value within double quotes using regex
  const match = err.message.match(/"([^"]*)"/);

  // The extracted value will be in the first capturing group
  const extractedMessage = match && match[1];

  const errorSources: TErrorSources = [
    {
      path: '',
      message: `${extractedMessage} is already exists`,
    },
  ];

  const statusCode = 400;

  return {
    statusCode,
    message: 'Invalid ID',
    errorSources,
  };
};

export default DuplicateErrorHandler;
