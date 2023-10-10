import { createContext } from "react";

export const AuthContext = createContext(
    {
        isAdminLoggedIn: false,
        isLoggedIn: false,
        adminLogin: ()=>{},
        adminLogout: ()=>{},
        login: ()=>{},
        logout:()=>{}
    }
)