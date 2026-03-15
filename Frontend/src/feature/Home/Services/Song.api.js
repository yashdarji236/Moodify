import axios from "axios";


const api = axios.create({
    baseURL:"http://localhost:3000",
    withCredentials:true
})


export async function GetSongs({mood}){
    const res = await api.get("/songs?mood="+ mood)
    return res.data
}