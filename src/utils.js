import axios from "axios";
import store from "@/store";

export {
    callAPI
};

async function callAPI(uriPath, method, requiresAuthorization, data = {}, headers = {}) {
    if (requiresAuthorization) {
        headers = {
            ...headers,
            "Authorization": "Bearer " + store.getters["auth/getKeycloakAuthentication"]["token"]
        };
    }

    const response = await axios({
        method: method,
        url: process.env.VUE_APP_BACKEND_ADDRESS + uriPath,
        headers: headers,
        data: data
    });

    return response["data"]
}
