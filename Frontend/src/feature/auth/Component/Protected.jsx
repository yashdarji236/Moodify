import { useAuth } from "../hooks/useAuth";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

const Protected = ({ children }) => {
  const navigate = useNavigate();

  const { loading, user } = useAuth();

  useEffect(() => {
    if (!user && !loading) {
      navigate('/login');
    }
  }, [user, loading, navigate]);

  if (loading) {
    return <h1>Loading...</h1>;
  }

  if (!user) {
    return null;
  }

  return children;
};

export default Protected;