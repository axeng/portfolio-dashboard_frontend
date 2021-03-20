import {
    SET_AUTHENTICATION,
    SET_USER_INFO
} from "./mutation-types.js";

export default {
    // Mutation to set the authentication
    [SET_AUTHENTICATION](state, { authentication }) {
        state.authentication = authentication;
    },

    // Mutation to set the user info
    [SET_USER_INFO](state, { userInfo }) {
        state.userInfo = userInfo;
    }
};
