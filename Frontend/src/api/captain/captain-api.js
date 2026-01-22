import {makeServerRequest} from "../makeServerRequest.js";
import {REQUEST_METHOD} from "../../constants.js";


export const captainSignUp = ( successFunction, failureFunction, requestBody  ) => {
    makeServerRequest("/captain/register", REQUEST_METHOD.POST, requestBody, successFunction, failureFunction)
}

export const captainLogin = ( successFunction, failureFunction, requestBody  ) => {
    makeServerRequest("/captain/login", REQUEST_METHOD.POST, requestBody, successFunction, failureFunction)
}