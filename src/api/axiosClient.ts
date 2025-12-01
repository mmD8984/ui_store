import axios from "axios";
import { getAuth } from "firebase/auth";

const axiosClient = axios.create({
    baseURL: "http://localhost:8080/api", // URL backend Spring Boot
    headers: {
        "Content-Type": "application/json",
    },
});

axiosClient.interceptors.request.use(
    async (config) => {
        const auth = getAuth();
        const user = auth.currentUser;

        if (user) {
            const token = await user.getIdToken(); // Lấy Firebase ID Token
            console.log("🔥 Firebase ID Token gửi lên backend:", token);
            config.headers.Authorization = `Bearer ${token}`;
        } else {
            console.warn("⚠ Không có user Firebase → Không gửi token lên backend");
        }
        return config;
    },
    (error) => Promise.reject(error)
);

axiosClient.interceptors.response.use(
    (response) => {
        return response;
    },
    (error) => {
        if (error.response?.status === 401) {
            console.warn("Unauthorized: Firebase Token có thể hết hạn hoặc không hợp lệ.");
        }
        return Promise.reject(error);
    }
);

export default axiosClient;
