import { createContext,useContext } from "react"; 
import { useLocalStorage } from "../../hooks";
import { loginAsync } from "../../api/auth.service";


export const authContext=createContext({});

authContext.displayName='AuthContext';
export const AuthProvider=({children})=>{
   const [user,setuser]=useLocalStorage("supper-app:auth",true)
    const login=async(credentials)=>{
        const user=await loginAsync(credentials)
        console.log('user',user)
            if(user&&user.token){
setuser(true)
            }
            else{
                setuser(false)
            }
    }
    const register =async(cradentials)=>{}
    const logOut =()=>{}




    return (<authContext.Provider value={{login,register,logOut,user}}>{children}</authContext.Provider>)

}
export const useAuthProvider=()=>{
    const auth=useContext(authContext)
    if(!auth){
        throw SyntaxError('syntaxError')
     }
     return auth;
    }
    