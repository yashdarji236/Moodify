import { createContext, useState ,useEffect} from "react";
import { Getme } from "./services/api.service";

export const AuthContext = createContext();

export function AuthProvider({ children }) {
    const [user, Setuser] = useState(null);
    const [loading, Setloading] = useState(true);


     useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await Getme()
        Setuser(res?.user)
      } catch {
        Setuser(null)
      } finally {
        Setloading(false)
      }
    }

    fetchUser()
  }, [])
    return (
        <AuthContext.Provider value={{ loading, user, Setuser, Setloading }}>
            {children}
        </AuthContext.Provider>
    );
}