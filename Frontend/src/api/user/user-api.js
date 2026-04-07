import {makeServerRequest} from "../makeServerRequest.js";
import {REQUEST_METHOD} from "../../constants.js";


export const userSignUp = ( successFunction, failureFunction, requestBody  ) => {
    makeServerRequest("/user/register", REQUEST_METHOD.POST, requestBody, successFunction, failureFunction)
}

export const userLogin = ( successFunction, failureFunction, requestBody  ) => {
    makeServerRequest("/user/login", REQUEST_METHOD.POST, requestBody, successFunction, failureFunction)
}

export const fareDetails = ( successFunction, failureFunction, requestBody  ) => {
    makeServerRequest("/fare", REQUEST_METHOD.POST, requestBody, successFunction, failureFunction)
}

export const makePayment = ( successFunction, failureFunction, requestBody  ) => {
    makeServerRequest("/payment/create-order", REQUEST_METHOD.POST, requestBody, successFunction, failureFunction)
}

export const verifyPayment = ( successFunction, failureFunction, requestBody  ) => {
    makeServerRequest("/payment/verify-payment", REQUEST_METHOD.POST, requestBody, successFunction, failureFunction)
}

export const logout = ( successFunction, failureFunction ) => {
    makeServerRequest("/user/logout", REQUEST_METHOD.POST, undefined, successFunction, failureFunction)
}

export const updateUser = (requestBody, successFunction, failureFunction) => {
    makeServerRequest("/user/update-user", REQUEST_METHOD.PUT, requestBody, successFunction, failureFunction);
};