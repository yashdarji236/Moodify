import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

const Signup = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const { register, loading } = useAuth();

  if (loading) {
    return (
      <main className="min-h-screen bg-[#212121] flex items-center justify-center">
        <div className="w-5 h-5 border-2 border-white/20 border-t-white rounded-full animate-spin" />
      </main>
    );
  }

  async function handleForm(e) {
    e.preventDefault();
    const res = await register(username, email, password);
    if (res.success) {
      navigate("/", {
        state: {
          message: `Welcome ${username} 👋`,
          userName: username,
        },
      });
    } else {
      setError(res.message);
    }
  }

  return (
    <div className="min-h-screen bg-[#212121] flex flex-col lg:flex-row">

      {/* ── LEFT PANEL (image) ── */}
      <div className="hidden lg:flex lg:w-1/2 relative overflow-hidden items-end">
        <img
          src="https://images.unsplash.com/photo-1614149162883-504ce4d13909?w=900&q=80"
          alt="Mood visual"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
        <div className="relative z-10 p-10 pb-12">
          <p className="text-white/90 text-lg font-semibold leading-snug max-w-xs">
            Start your emotional<br />journey today.
          </p>
          <p className="text-white/50 text-sm mt-2">
            MoodSync AI · Real-time emotion soundscapes
          </p>
        </div>
      </div>

      {/* ── RIGHT PANEL (form) ── */}
      <div className="flex-1 flex flex-col items-center justify-center px-6 py-14 lg:py-0">

        {/* Logo + title */}
        <div className="mb-8 flex flex-col items-center gap-3">
          <div className="w-11 h-11">
            <svg viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
              <circle cx="20" cy="20" r="19" stroke="white" strokeWidth="1.5" />
              <path
                d="M10 20 Q15 12 20 20 Q25 28 30 20"
                stroke="white"
                strokeWidth="1.8"
                strokeLinecap="round"
                fill="none"
              />
            </svg>
          </div>
          <h1 className="text-white text-[1.6rem] font-bold tracking-[-0.02em]">
            Create an account
          </h1>
        </div>

        {/* Form */}
        <div className="w-full max-w-[360px]">
          <form onSubmit={handleForm} className="flex flex-col gap-3">

            {/* Username */}
            <input
              type="text"
              placeholder="Username"
              value={username}
              onInput={(e) => { setUsername(e.target.value); setError(""); }}
              name="username"
              required
              className="
                w-full bg-[#2f2f2f]
                border border-[#3f3f3f]
                hover:border-[#555555] focus:border-[#666666]
                text-white text-sm rounded-xl px-4 py-3.5
                outline-none transition-colors duration-150
                placeholder:text-[#8e8ea0] caret-white
              "
            />

            {/* Email */}
            <input
              type="email"
              placeholder="Email address"
              value={email}
              onInput={(e) => { setEmail(e.target.value); setError(""); }}
              name="email"
              required
              className="
                w-full bg-[#2f2f2f]
                border border-[#3f3f3f]
                hover:border-[#555555] focus:border-[#666666]
                text-white text-sm rounded-xl px-4 py-3.5
                outline-none transition-colors duration-150
                placeholder:text-[#8e8ea0] caret-white
              "
            />

            {/* Password */}
            <input
              type="password"
              placeholder="Password"
              value={password}
              onInput={(e) => { setPassword(e.target.value); setError(""); }}
              name="password"
              required
              className="
                w-full bg-[#2f2f2f]
                border border-[#3f3f3f]
                hover:border-[#555555] focus:border-[#666666]
                text-white text-sm rounded-xl px-4 py-3.5
                outline-none transition-colors duration-150
                placeholder:text-[#8e8ea0] caret-white
              "
            />

            {/* Error */}
            {error && (
              <p className="text-[#ff6b6b] text-xs px-1 -mt-1">{error}</p>
            )}

            {/* Submit */}
            <button
              type="submit"
              className="
                w-full mt-1
                bg-white hover:bg-[#ececec] active:bg-[#d9d9d9]
                text-[#212121] text-sm font-semibold
                rounded-xl py-3.5
                transition-colors duration-150 cursor-pointer
              "
            >
              Continue
            </button>
          </form>

          {/* Footer */}
          <p className="text-center text-xs text-[#8e8ea0] mt-6">
            Already have an account?{" "}
            <span
              onClick={() => navigate("/login")}
              className="text-white font-medium cursor-pointer hover:underline underline-offset-2"
            >
              Log in
            </span>
          </p>

          <p className="mt-5 text-center text-[11px] text-[#555] leading-relaxed">
            By continuing, you agree to MoodSync's{" "}
            <span className="underline underline-offset-2 cursor-pointer hover:text-[#888] transition-colors">
              Terms of Service
            </span>{" "}
            and{" "}
            <span className="underline underline-offset-2 cursor-pointer hover:text-[#888] transition-colors">
              Privacy Policy
            </span>.
          </p>
        </div>
      </div>

    </div>
  );
};

export default Signup;