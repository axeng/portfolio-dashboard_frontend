import {
    SET_AUTHENTICATION,
    SET_USER_INFO
} from "./mutation-types.js";

import axios from "axios";

export default {
    initKeycloak,
    logout
};

async function initKeycloak({ commit, state }) {
    if (state["authentication"] !== undefined) {
        return true;
    }

    let keycloakAuth = new Keycloak({
        url: process.env.VUE_APP_KEYCLOAK_ADDRESS,
        realm: process.env.VUE_APP_KEYCLOAK_REALM,
        clientId: process.env.VUE_APP_KEYCLOAK_CLIENT_ID
    });

    try {
        const auth = await keycloakAuth.init({ onLoad: "login-required" });

        if (!auth) {
            window.location.reload();
        }

        setAuthentication({ commit, state }, { authentication: keycloakAuth });

        setInterval(() => {
            keycloakAuth.updateToken(70).then((refreshed) => {
                if (refreshed) {
                    setAuthentication({ commit, state }, { authentication: keycloakAuth });
                }
            }).catch((error) => {
                if (process.env.VUE_APP_PRINT_ERROR === "true") {
                    console.error("Token not refreshed, valid for " + Math.round(keycloakAuth.tokenParsed.exp + keycloakAuth.timeSkew - new Date().getTime() / 1000) + " seconds");
                    console.error(error);
                }
            });
        }, 60000);

        return true;
    } catch (error) {
        if (process.env.VUE_APP_PRINT_ERROR === "true") {
            console.error(error);
        }

        return false;
    }
}

async function loadUserInfo({ commit, state: { authentication } }) {
    try {
        const userInfo = await authentication.loadUserInfo();
        commit(SET_USER_INFO, { userInfo });
    } catch (error) {
        if (process.env.VUE_APP_PRINT_ERROR === "true") {
            console.error(error);
        }
    }
}

function logout({ commit, state }) {
    if (state["authentication"] !== undefined) {
        state["authentication"].logout().then(() => {
            resetAuthentication({ commit });
            initKeycloak({ commit, state });
        });
    }
}

function setAuthentication({ commit, state }, { authentication }) {
    commit(SET_AUTHENTICATION, { authentication });
    axios.defaults.headers.common["Authorization"] = "Bearer " + authentication["token"];
    loadUserInfo({ commit, state });
}

function resetAuthentication({ commit }) {
    commit(SET_AUTHENTICATION, { authentication: undefined });
    commit(SET_USER_INFO, { userInfo: undefined });
    delete axios.defaults.headers.common["Authorization"];
}
