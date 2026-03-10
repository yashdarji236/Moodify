import { createContext, useState } from "react";

export const AuthContext = createContext();

export function AuthProvider({ children }) {
    const [user, Setuser] = useState([]);
    const [loading, Setloading] = useState(false);

    return (
        <AuthContext.Provider value={{ loading, user, Setuser, Setloading }}>
            {children}
        </AuthContext.Provider>
    );
}