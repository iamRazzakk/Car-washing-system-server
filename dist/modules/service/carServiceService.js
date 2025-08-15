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
exports.carServiceServices = void 0;
const http_status_1 = __importDefault(require("http-status"));
const AppError_1 = __importDefault(require("../../error/AppError"));
const carServiceModel_1 = require("./carServiceModel");
const QueryBuilder_1 = __importDefault(require("../../builder/QueryBuilder"));
const createCarServiceIntoDB = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, description, price, duration, isDeleted, image } = payload;
    // Create and save the new service
    const newService = yield carServiceModel_1.CarServiceModel.create({
        name,
        description,
        price,
        duration,
        isDeleted: isDeleted || false,
        image,
    });
    return newService;
});
// get single car service data
const getSingleCarServiceFromDB = (id) => __awaiter(void 0, void 0, void 0, function* () {
    // get data from database using id
    const serviceData = yield carServiceModel_1.CarServiceModel.findById(id);
    if (!serviceData) {
        throw new AppError_1.default(http_status_1.default.NOT_FOUND, "Data Not Found");
    }
    return serviceData;
});
// get all data from database
const getAllCarServiceFromDB = (query) => __awaiter(void 0, void 0, void 0, function* () {
    const queryBuilder = new QueryBuilder_1.default(carServiceModel_1.CarServiceModel.find(), query);
    const serviceData = yield queryBuilder
        .search(["name", "description"])
        .filter()
        .sort()
        .paginate()
        .fields()
        .modelQuery.exec();
    const paginationInfo = yield queryBuilder.getPaginationInfo();
    return {
        meta: paginationInfo,
        data: serviceData,
    };
});
// update single car service from database
const updateSingleCarServiceIntoDB = (id, payload) => __awaiter(void 0, void 0, void 0, function* () {
    const serviceData = yield carServiceModel_1.CarServiceModel.findOneAndUpdate({ _id: id }, payload, {
        new: true,
        runValidators: true,
        upsert: false,
    });
    if (!serviceData) {
        throw new AppError_1.default(http_status_1.default.NOT_FOUND, "Data Not Found");
    }
    return serviceData;
});
// delete sing car service from database
const deleteSingleCarServiceFromDB = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const serviceData = yield carServiceModel_1.CarServiceModel.findByIdAndUpdate(id, {
        isDeleted: true,
    }, {
        new: true,
        runValidators: true,
    });
    if (!serviceData) {
        throw new AppError_1.default(http_status_1.default.NOT_FOUND, "Data Not Found");
    }
    return serviceData;
});
exports.carServiceServices = {
    createCarServiceIntoDB,
    getSingleCarServiceFromDB,
    getAllCarServiceFromDB,
    updateSingleCarServiceIntoDB,
    deleteSingleCarServiceFromDB,
};
