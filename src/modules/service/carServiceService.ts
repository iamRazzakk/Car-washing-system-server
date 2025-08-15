import httpStatus from "http-status";
import AppError from "../../error/AppError";
import { TCreateService } from "./carServiceInterface";
import { CarServiceModel } from "./carServiceModel";
import QueryBuilder from "../../builder/QueryBuilder";

const createCarServiceIntoDB = async (payload: TCreateService) => {
  const { name, description, price, duration, isDeleted, image } = payload;

  // Create and save the new service
  const newService = await CarServiceModel.create({
    name,
    description,
    price,
    duration,
    isDeleted: isDeleted || false,
    image,
  });

  return newService;
};
// get single car service data
const getSingleCarServiceFromDB = async (id: string) => {
  // get data from database using id
  const serviceData = await CarServiceModel.findById(id);
  if (!serviceData) {
    throw new AppError(httpStatus.NOT_FOUND, "Data Not Found");
  }
  return serviceData;
};

// get all data from database
const getAllCarServiceFromDB = async (query: Record<string, unknown>) => {
  const queryBuilder = new QueryBuilder(CarServiceModel.find(), query);

  const serviceData = await queryBuilder
    .search(["name", "description"])
    .filter()
    .sort()
    .paginate()
    .fields()
    .modelQuery.exec();

  const paginationInfo = await queryBuilder.getPaginationInfo();

  return {
    meta: paginationInfo,
    data: serviceData,
  };
};
// update single car service from database
const updateSingleCarServiceIntoDB = async (
  id: string,
  payload: Partial<TCreateService>
) => {
  const serviceData = await CarServiceModel.findOneAndUpdate(
    { _id: id },
    payload,
    {
      new: true,
      runValidators: true,
      upsert: false,
    }
  );
  if (!serviceData) {
    throw new AppError(httpStatus.NOT_FOUND, "Data Not Found");
  }
  return serviceData;
};

// delete sing car service from database
const deleteSingleCarServiceFromDB = async (id: string) => {
  const serviceData = await CarServiceModel.findByIdAndUpdate(
    id,
    {
      isDeleted: true,
    },
    {
      new: true,
      runValidators: true,
    }
  );
  if (!serviceData) {
    throw new AppError(httpStatus.NOT_FOUND, "Data Not Found");
  }
  return serviceData;
};

export const carServiceServices = {
  createCarServiceIntoDB,
  getSingleCarServiceFromDB,
  getAllCarServiceFromDB,
  updateSingleCarServiceIntoDB,
  deleteSingleCarServiceFromDB,
};
