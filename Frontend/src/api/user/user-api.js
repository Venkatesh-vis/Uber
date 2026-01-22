import {makeServerRequest} from "../makeServerRequest.js";
import {REQUEST_METHOD} from "../../constants.js";


export const userSignUp = ( successFunction, failureFunction, requestBody  ) => {
    makeServerRequest("/user/register", REQUEST_METHOD.POST, requestBody, successFunction, failureFunction)
}

export const userLogin = ( successFunction, failureFunction, requestBody  ) => {
    makeServerRequest("/user/login", REQUEST_METHOD.POST, requestBody, successFunction, failureFunction)
}