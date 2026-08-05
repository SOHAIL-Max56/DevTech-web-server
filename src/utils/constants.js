//  Production

// export const APP_BASE_URL = "/api";

// Development
export const APP_BASE_URL =
  location.hostname === "localhost" ? "http://localhost:3000" : "/api";
