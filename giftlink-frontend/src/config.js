const config = {
	backendUrl: process.env.NODE_ENV === "production" ? process.env.REACT_APP_BACKEND_URL : process.env.REACT_APP_BACKEND_URL_DEV,
};

console.log(`backendUrl in config.js: ${config.backendUrl}`);
export { config as urlConfig };
