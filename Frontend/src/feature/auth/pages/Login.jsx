import React from "react";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import {useAuth} from '../hooks/useAuth'
const Signup = () => {
   const usenavigate = useNavigate();
   
     const [username , Setusername] = useState("")
  
     const [error , setError] = useState("")
     const [password , Setpassword] = useState("")
     const { login ,loading} = useAuth()
       if(loading){
      return <main> <h1>Loading....</h1></main>
    }
  async function handleForm(e){
    
    e.preventDefault()

    const res = await login(username  , password)
    if(res.success){
        usenavigate('/',{
          state:{
             message: `Welcome back ${username} 👋`,
        userName: username
          }
        })
        
    }else {
    setError(res.message);
    console.log(res);
    
  }
}
  return (
    <div
      className="
        min-h-[100vh]
        bg-[#0A0A0A]
        text-slate-100
        flex flex-col
        lg:flex-row
        items-center
        justify-center
        gap-12
        px-4 sm:px-6 lg:px-16
        overflow-hidden
        pb-[env(safe-area-inset-bottom)]
      "
    >

      {/* LEFT TEXT */}
      <div className="relative z-10 w-full max-w-md text-center lg:text-left">
        <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white">
          Start Your Emotional Journey
        </h1>

        <p className="text-slate-400 text-sm sm:text-base mt-4 leading-relaxed">
          Personalized soundscapes for every mood.
        </p>

        <p className="hidden lg:block mt-6 text-sm text-slate-500 max-w-sm">
          MoodSync AI analyzes your facial expressions in real time and
          adapts music to perfectly match how you feel — instantly.
        </p>
      </div>

      {/* RIGHT CARD */}
      <main className="relative z-10 w-full max-w-sm sm:max-w-md">

        <div
          className="
            bg-[#121212]/80
            backdrop-blur-xl
            border border-white/10
            shadow-[0_0_50px_-12px_rgba(34,211,238,0.3)]
            rounded-3xl
            p-6 sm:p-8
          "
        >

          <form className="space-y-5" onSubmit={handleForm}>

            {/* USERNAME */}
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-slate-500 mb-1.5 ml-1">
                Create Username
              </label>

              <input
                type="text"
                placeholder="Enter Username"
                
                 onInput={(e)=>{Setusername(e.target.value) , setError("")}} name="username"
                className="
                  w-full bg-white/5 border border-white/10
                  rounded-xl px-4 py-3 text-sm
                  focus:border-primary focus:ring-1 focus:ring-primary
                  outline-none transition
                  placeholder:text-slate-600
                " required
              />
            </div>

          

            {/* PASSWORD */}
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-slate-500 mb-1.5 ml-1">
                Create Password
              </label>

              <input
                type="password"
                placeholder="••••••••"
                 onInput={(e)=>{Setpassword(e.target.value) , setError("")}} name="password"
                className="
                  w-full bg-white/5 border border-white/10
                  rounded-xl px-4 py-3 text-sm
                  focus:border-primary focus:ring-1 focus:ring-primary
                  outline-none transition
                  placeholder:text-slate-600
                " required
              />
            </div>

            {/* BUTTON */}
            <button
              type="submit"
              className="
                w-full bg-cyan-400
                text-black font-bold py-4 rounded-2xl
                shadow-[0_0_20px_rgba(34,211,238,0.3)]
                transition active:scale-95
              "
            >
              Login
            </button>

          </form>

          {/* LOGIN LINK */}
          <div className="mt-6 text-center">
            <p className="text-sm text-slate-500">
              Already have an account?{" "}
              <span
                onClick={()=>usenavigate('/register')}
                className="text-primary cursor-pointer hover:underline"
              >
                login
              </span>
            </p>
          </div>

        </div>

        <p className="mt-8 text-center text-[10px] text-slate-600 uppercase tracking-widest lg:hidden">
          Privacy focused • Encrypted analysis
        </p>
         
      </main>
       {error && <p className=" absolute p-1.5 top-1.5 right-1.5 bg-red-500 text-white rounded-xl font-medium">{error}</p>}
    </div>
    
  );
};

export default Signup;

