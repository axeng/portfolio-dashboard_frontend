import { logError } from "@/logger.js";
import {
    SET_KEYCLOAK_AUTHENTICATION,
    SET_USER_INFO
} from "./mutation-types.js";

export default {
    initKeycloak,
    logout
};

async function initKeycloak({ commit, state }) {
    if (state["keycloakAuthentication"] !== undefined) {
        return true;
    }

    let keycloakAuthentication = new Keycloak({
        url: process.env.VUE_APP_KEYCLOAK_ADDRESS,
        realm: process.env.VUE_APP_KEYCLOAK_REALM,
        clientId: process.env.VUE_APP_KEYCLOAK_CLIENT_ID
    });

    try {
        const auth = await keycloakAuthentication.init({ onLoad: "login-required" });

        if (!auth) {
            window.location.reload();
        }

        setKeycloakAuthentication({ commit, state }, { keycloakAuthentication });

        setInterval(() => {
            keycloakAuthentication.updateToken(70).then((refreshed) => {
                if (refreshed) {
                    setKeycloakAuthentication({ commit, state }, { keycloakAuthentication });
                }
            }).catch((error) => {
                logError("Token not refreshed, valid for " + Math.round(keycloakAuthentication["tokenParsed"]["exp"] + keycloakAuthentication["timeSkew"] - new Date().getTime() / 1000) + " seconds");
                logError(error);
            });
        }, 60000);

        return true;
    } catch (error) {
        logError(error);

        return false;
    }
}

async function loadUserInfo({ commit, state: { keycloakAuthentication } }) {
    try {
        const userInfo = await keycloakAuthentication.loadUserInfo();
        commit(SET_USER_INFO, { userInfo });
    } catch (error) {
        logError(error);
    }
}

async function logout({ commit, state }) {
    if (state["keycloakAuthentication"] !== undefined) {
        await state["keycloakAuthentication"].logout();
        resetKeycloakAuthentication({ commit });
        initKeycloak({ commit, state });
    }
}

function setKeycloakAuthentication({ commit, state }, { keycloakAuthentication }) {
    commit(SET_KEYCLOAK_AUTHENTICATION, { keycloakAuthentication });
    loadUserInfo({ commit, state });
}

function resetKeycloakAuthentication({ commit }) {
    commit(SET_KEYCLOAK_AUTHENTICATION, { keycloakAuthentication: undefined });
    commit(SET_USER_INFO, { userInfo: undefined });
}
