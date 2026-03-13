import { useEffect , useContext } from "react";
import { AuthContext } from "../authContext";
import { Register , Login , logout , Getme} from "../services/api.service";


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
    const Logout = async()=>{
        Setloading(true)
        const res = await logout()
        Setuser(null)
        Setloading(false)
    }
    const getMe = async()=>{
        Setloading(true)
        const data = await Getme()
        Setuser(data.user)
        
        
        Setloading(false)
        return data
    }
  
    return {
        register , loading , user , login , Logout , getMe
    }
}