import jwtDecode from "jwt-decode";
import { createContext, useState, useContext} from "react";

const AuthContext=createContext()

function AuthProvider({children}){

    const [user, setUser] = useState(
        ()=>{
            const token= JSON.parse(localStorage.getItem("token"))
            if(token){
                return jwtDecode(token.access)
            }
            return null
        }
    );

    return (
        <AuthContext.Provider value={
            {user, setUser}
        }>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthProvider

export function useAuth(){
    return useContext(AuthContext)
}






































