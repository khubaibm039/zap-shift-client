import axios from "axios";
import useAuth from "./useAuth";
import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router";

const axiosSecure = axios.create({
    baseURL: "http://localhost:3000",
});

const useAxiosSecure = () => {
    const location = useLocation();
    const navigate = useNavigate()
    const { user,logOut } = useAuth();
    useEffect(() => {
        //? intercepts
        const reqInterceptor = axiosSecure.interceptors.request.use(
            (config) => {
                const token = user?.accessToken
                config.headers.Authorization = `Bearer ${token}`;
                return config;
            },
        );
        //? interceptor
        const resInterceptor = axiosSecure.interceptors.response.use((response)=>{
            return response
        }, (error)=>{
            const statusCode = error.status
            if(statusCode === 401 || statusCode === 403){
                logOut()
                    .then(()=>{
                        navigate(location.state || '/login')
                    })
            }
            return Promise.reject(error)
        })

        return () => {
            axiosSecure.interceptors.request.eject(reqInterceptor)
            axiosSecure.interceptors.response.eject(resInterceptor)
        };
    }, [user, navigate,location.state, logOut]);
    return axiosSecure;
};

export default useAxiosSecure;
