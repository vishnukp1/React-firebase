import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { AppLayout } from "./core";


const App = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const idToken = localStorage.getItem("idToken");
   
    

    if (idToken) {
      navigate("/home");
    }
  }, [navigate]);

  return (
    <div>
      <AppLayout />
    </div>
  );
};

export default App;
