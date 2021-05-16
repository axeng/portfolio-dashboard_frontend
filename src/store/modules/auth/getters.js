export default {
    getKeycloakAuthentication,
    getUserInfo
};

// Returns the Keycloak authentication
function getKeycloakAuthentication({ keycloakAuthentication }) {
    return keycloakAuthentication;
}

// Returns the user info
function getUserInfo({ userInfo }) {
    return userInfo;
}
