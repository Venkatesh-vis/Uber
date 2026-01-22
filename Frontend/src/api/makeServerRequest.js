import axios from "axios";
import {API_BASE_URL} from "../constants.js";

export const makeServerRequest = (requestURL, requestMethod, requestBody, successCallBackFunction, failureCallBackFunction) => {
    const requestConfiguration = {
        method: requestMethod,
        url: API_BASE_URL + requestURL,
        data: requestBody,
        withCredentials: true,
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        }
    };
    axios(requestConfiguration)
        .then(
            function (serverResponse) {
                successCallBackFunction(serverResponse.data, serverResponse.status)
            }
        )
        .catch(function (err) {
            if (err?.response?.status === 401) {
                window.dispatchEvent(new Event("auth:expired"));
            }
            console.log(err)
            failureCallBackFunction(err.response)
        })
};