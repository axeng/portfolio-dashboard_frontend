import { logError } from "@/logger.js";
import axios from "axios";
import store from "@/store";

export {
    callAPI
};

async function callAPI({
                           uriPath,
                           method,
                           requiresAuthorization = true,
                           data = {},
                           parameters = {},
                           headers = {},
                           defaultIfError = undefined
                       }) {
    if (requiresAuthorization) {
        headers = {
            ...headers,
            "Authorization": "Bearer " + store.getters["auth/getKeycloakAuthentication"]["token"]
        };
    }

    try {
        const response = await axios({
            method: method,
            url: process.env.VUE_APP_BACKEND_ADDRESS + uriPath,
            headers: headers,
            data: data,
            params: parameters
        });

        return response["data"];
    } catch (error) {
        logError(error);

        return defaultIfError;
    }
}
