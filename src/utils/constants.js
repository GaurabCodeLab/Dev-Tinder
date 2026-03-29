// export const API_BASE_URL = "https://node-api-nkxo.onrender.com";
// export const API_BASE_URL = "http://localhost:8080";
export const API_BASE_URL =
  location.hostname === "localhost" ? "http://localhost:8080" : "/api";
