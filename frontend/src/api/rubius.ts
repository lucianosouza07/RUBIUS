import axios from "axios";
import type { AxiosInstance } from "axios";

export const rubius_api: AxiosInstance = axios.create({
	baseURL: "http://localhost:8000",
	timeout: 60000,
	withCredentials: true
});
