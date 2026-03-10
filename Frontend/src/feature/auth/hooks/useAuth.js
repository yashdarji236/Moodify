import { useEffect , useContext } from "react";
import { AuthContext } from "../authContext";
import { Register , Login } from "../services/api.service";


export const useAuth = () =>{
    const context = useContext(AuthContext)
    const { loading , user , Setuser , Setloading} = context
    
    const register = async(username , email , password) =>{
        Setloading(true)
        const res = await Register(username , email , password)
        if(res?.data?.user){
            Setuser(res.data.user)
        }
        
        
        Setloading(false)
        return res
    }
    const login = async(username , password)=>{
        Setloading(true)
        const res = await Login(username , password)
        if(res?.data?.user){
            Setuser(res.data.user)
        }
        Setloading(false)
        return res
    }
    return {
        register , loading , user , login
    }
}