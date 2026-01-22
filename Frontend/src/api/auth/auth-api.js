import {makeServerRequest} from "../makeServerRequest.js";
import {REQUEST_METHOD} from "../../constants.js";

export const getAuthenticatedUser = (successFunction, failureFunction) => {
    makeServerRequest("/auth/me", REQUEST_METHOD.GET, null, successFunction, failureFunction);
};