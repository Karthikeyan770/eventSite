'use client';
import { useContext, useState, useEffect, createContext } from "react";
import { useRouter } from "next/navigation";
import { NEXT_URL } from "@/config/index";
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { deleteCookie } from "@/app/action";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [error, setError] = useState(null);
    const router = useRouter();
    useEffect(() => {
        checkUserLoggedIn();
    }, []);

    const register = async (user) => {
        const res = await fetch(`${NEXT_URL}/api/register`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(user)
        });
        const data = await res.json();
        if(res.ok){
            setUser(data.user);
            router.push('/account/dashboard');
        }
        else{
            setError(data.error);
            toast.error(data.error);
        }
    }

    const login = async ({email: identifier, password}) => {
        const res = await fetch(`${NEXT_URL}/api/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                identifier, password
            })
        });
        const data = await res.json();
        if(res.ok){
            setUser(data.user);
            router.push('/account/dashboard');
        }
        else{
            setError(data.error);
            toast.error(data.error);
        }
    }

    const logout = async () => {
        deleteCookie();
        setUser(null);
        router.push('/');
    }

    const checkUserLoggedIn = async (user) => {
        const res = await fetch(`${NEXT_URL}/api/user`);
        const data = await res.json();
        if(data.user){
            setUser(data.user);
        }
        else{
            setUser(null);
        }
    }

    return (
        <AuthContext.Provider value={{user, error, register, login, logout,}}>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthContext