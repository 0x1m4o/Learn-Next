import { setupCache } from "axios-cache-interceptor";

import axios from "axios";
const API_HOST = "https://jsonplaceholder.typicode.com";

const client = axios.create({ baseURL: API_HOST });
export const axiosCache = setupCache(client);
