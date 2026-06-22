import React from "react";
import { Navigate } from "react-router-dom";
import { MyAuth } from "../../Context/UserContext";

const ProtectedRoute = ({ children }) => {

  const {user} = MyAuth()

    if(!user){
        return <Navigate to="/login" replace/>
    }

  return children;
};

export default ProtectedRoute;
