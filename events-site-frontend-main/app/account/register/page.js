'use client'
import { FaUser } from "react-icons/fa";
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { useState, useEffect, useContext } from "react";
import Link from "next/link";
import AuthContext from "@/context/AuthContext";

const RegisterPage = () => {
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const {register} = useContext(AuthContext);
  const handleSubmit = async (e) => {
    e.preventDefault();
    if(password!== confirmPassword){
      toast.error('Passwords do not match');
      return;
    }
    register({username: userName, email, password});
  }
  return (
    <div className="h-full flex items-center justify-center my-9">
        <div className=" drop-shadow-xl shadow-2xl shadow-slate-800 flex flex-col items-center gap-3 w-3/5 rounded-lg p-4">
            <h1 className="font-bold text-3xl mb-5"><FaUser className="inline text-xl"/> Register</h1>
            <form className="w-full flex flex-col items-center gap-5 mb-3" onSubmit={handleSubmit}>
               <div className="w-4/5">
                <label htmlFor="name" className="font-bold text-lg">Name</label>
                <input type="text" id="name" className="w-full border-2 border-slate-400 rounded-lg p-2" 
                onChange={(e) => {setUserName(e.target.value)}}/>
               </div>
                <div className="w-4/5">
                    <label htmlFor="email" className="font-bold text-lg">Email</label>
                    <input type="email" id="email" className="w-full border-2 border-slate-400 rounded-lg p-2" 
                    onChange={(e) => {setEmail(e.target.value)}}/>
                </div>
                <div className="w-4/5">
                    <label htmlFor="password" className="font-bold text-lg">Password</label>
                    <input type="password" id="password" className="w-full border-2 border-slate-400 rounded-lg p-2" 
                    onChange={(e) => {setPassword(e.target.value)}}/>
                </div>
                <div className="w-4/5">
                   <label htmlFor="confirmPassword" className="font-bold text-lg">Confirm Password</label>
                  <input type="password" id="confirmPassword" className="w-full border-2 border-slate-400 rounded-lg p-2" 
                  onChange={(e) => {setConfirmPassword(e.target.value)}}/>
                </div>
                <input type="submit" value='Register' className="bg-orange-500 hover:bg-orange-700 transition-colors
                text-white w-1/5 px-5 py-3 rounded-lg mt-3"/>
            </form>
            <p>Already have an account? <Link href='/account/login' className=" text-blue-600">Register</Link></p>
            <ToastContainer position="bottom-left" theme="colored" newestOnTop/>
        </div>
    </div>
  )
}

export default RegisterPage