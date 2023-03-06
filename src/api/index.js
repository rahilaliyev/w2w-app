import axios from "axios";

const endPoint = process.env.API_URL || "http://127.0.0.1:8000/api/";

let authToken = localStorage.getItem("authToken") || null;

if (authToken) {
  authToken = authToken.slice(1, -1); // remove quotes from the token
}

console.log(authToken);
export const api = axios.create({
  baseURL: endPoint,
  headers: {
    "Content-Type": "application/json",
    Authorization: `Bearer ${authToken}`,
  },
});

api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("authToken");
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export function auth() {
  return axios.create({
    baseURL: endPoint,
    headers: {
      "Content-Type": "application/json",
    },
  });
}
