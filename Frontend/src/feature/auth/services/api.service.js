import axios from 'axios'
const api = axios.create({
    baseURL:"http://localhost:3000",
    withCredentials:true
})

export async function Register( username , email , password ){
    try{
        const res = await api.post('/auth/register',{
        username,
        email,
        password
    })
    return { success:true , data:res.data}
    }
    catch(error){
        return{
            success:false,
            message:error.response?.data?.message
        }
    }
}


export async function Login(username , password){
    try{
        const res = await api.post('/auth/login',{
            username,
            password
        })
        return { success:true , data:res.data }
    }catch(error){
        return {
            success:false,
            message:error.response?.data?.message
        }
    }
}
export async function logout(){
    try{
        const res = await api.get('/auth/logout')
         return { success:true , data:res.data }
    }catch(error){
        return{
            success:false,
            message:error.response?.data?.message
        }
    }
}
export async function Getme(){
    const res = await api.get('/auth/get-me')
    return res.data
}