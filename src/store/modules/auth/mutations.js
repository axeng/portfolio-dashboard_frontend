import {
    SET_KEYCLOAK_AUTHENTICATION,
    SET_USER_INFO
} from "./mutation-types.js";

export default {
    // Mutation to set the Keycloak authentication
    [SET_KEYCLOAK_AUTHENTICATION](state, { keycloakAuthentication }) {
        state.keycloakAuthentication = keycloakAuthentication;
    },

    // Mutation to set the user info
    [SET_USER_INFO](state, { userInfo }) {
        state.userInfo = userInfo;
    }
};
