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
exports.carServiceController = void 0;
const catchAsync_1 = __importDefault(require("../../utils/catchAsync"));
const carServiceService_1 = require("./carServiceService");
const sendResponse_1 = __importDefault(require("../../utils/sendResponse"));
const http_status_1 = __importDefault(require("http-status"));
const createService = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = req.body;
    const newService = yield carServiceService_1.carServiceServices.createCarServiceIntoDB(result);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.CREATED,
        success: true,
        message: "Service created successfully",
        data: newService,
    });
}));
const getServiceById = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // get this data useing id
    const { id } = req.params;
    const serviceData = yield carServiceService_1.carServiceServices.getSingleCarServiceFromDB(id);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.CREATED,
        success: true,
        message: "Service retrieved successfully",
        data: serviceData,
    });
}));
// get all car service form database
const getAllCarService = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const serviceData = yield carServiceService_1.carServiceServices.getAllCarServiceFromDB();
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.CREATED,
        success: true,
        message: "Service retrieved successfully",
        data: serviceData,
    });
}));
// update a car service in database useing id
const updateSingleCarService = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const serviceData = yield carServiceService_1.carServiceServices.updateSingleCarServiceIntoDB(id, req.body);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: "Service updated successfully",
        data: serviceData,
    });
}));
//  delete data form database
const deleteSingleCarService = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const serviceData = yield carServiceService_1.carServiceServices.deleteSingleCarServiceFromDB(id);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: "Service deleted successfully",
        data: serviceData,
    });
}));
exports.carServiceController = {
    createService,
    getServiceById,
    getAllCarService,
    updateSingleCarService,
    deleteSingleCarService
};
