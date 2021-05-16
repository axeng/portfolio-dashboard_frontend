export {
    logError
};

function logError(message) {
    if (process.env.VUE_APP_PRINT_ERROR === "true") {
        console.error(message);
    }
}
