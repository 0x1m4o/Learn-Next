import { setupCache } from "axios-cache-interceptor";

import axios from "axios";
const BASE_URL = "https://profile-card-api.vercel.app"

export const client = axios.create({ baseURL: BASE_URL });
export const axiosCache = setupCache(client);
