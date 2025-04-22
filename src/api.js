import axios from "axios";
import { authStore } from "./store/authStore";
const instance = axios.create({
    baseURL:import.meta.env.VITE_API_BASE_URL
})
instance.interceptors.request.use((config)=>{
    const auth = authStore(); // ✅ avoid name conflict
    if(auth.token){
        config.headers.Authorization = `Bearer ${auth.token}`;
    }
    return config;
})

export default instance