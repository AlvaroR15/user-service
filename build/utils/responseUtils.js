"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.generalErrorResponse = exports.errorResponse = exports.successResponse = void 0;
const successResponse = (message, status, data) => {
    return {
        success: true,
        status,
        message,
        data
    };
};
exports.successResponse = successResponse;
const errorResponse = (message, status) => {
    return {
        success: false,
        status,
        message
    };
};
exports.errorResponse = errorResponse;
const generalErrorResponse = () => {
    return {
        success: false,
        status: 500,
        message: 'Internal server error.'
    };
};
exports.generalErrorResponse = generalErrorResponse;
