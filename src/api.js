import axios from "axios";
import { authStore } from "./store/authStore";
const instance = axios.create({
    baseURL:''
})
instance.interceptors.request.use((config)=>{
    const authStore = authStore();
    if(authStore.token){
        config.headers.Authorization=`Bearer ${authStore.token}`
    }
    return config;
})

export default instance