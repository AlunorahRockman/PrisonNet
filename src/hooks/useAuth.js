import jwtDecode from "jwt-decode";
import { createContext, useState, useContext, useEffect} from "react";
import io from "socket.io-client";

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

    const [socket, setSocket] = useState(null);

    useEffect(() => {
        const socketInstance = io("http://localhost:5000");

        if(user){
            socketInstance.emit('join-chat', {
            me:user.id,
        })
        }

        socketInstance.on('reconnect', (attemptNumber) => {
            console.log(`Socket reconnected after attempt ${attemptNumber}`);
            if (user) {
                socketInstance.emit('join-chat', {
                    me: user.id,
                });
            }
        });

        setSocket(socketInstance);

        return () => {
            socketInstance.disconnect();
        };
    }, [user]);

    return (
        <AuthContext.Provider value={
            {user, setUser, socket}
        }>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthProvider

export function useAuth(){
    return useContext(AuthContext)
}






































