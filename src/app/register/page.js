"use client"
import {signIn} from "next-auth/react"
import Image from "next/image"
import Link from "next/link";
import { useState } from "react"

export default function Register(){
    const[email,setEmail]=useState('');
    const[password,setPassword]=useState('');
    const [creatingUser,setCreatingUser]=useState(false);
    const [userCreated,setUserCreated]=useState(false);
    const [error,setError]=useState(false);

    const handleFormSubmit=async(e)=>{
        e.preventDefault();
        setCreatingUser(true);
        setUserCreated(false);
        setError(false);
        const response=await fetch('/api/register',{
            method:'POST',
            body:JSON.stringify({email,password}),
            headers:{'Content-Type':'application/json'},
        });
        setCreatingUser(false);
        if(!response.ok) setError(true);
        else setUserCreated(true);
    }
    return (
        <section className="mt-8">
            <h1 className="text-center text-primary text-4xl ">Register</h1>
            {userCreated && (
                <div className="my-4 text-center">User created.<br/>Now you can <Link className="underline" href={'/login'}>login &raquo;</Link></div>
            )}
            {
                error &&  (
                <div className="my-4 text-center">
                    An error has been occurred.<br/>
                    Please try again later.
                </div>
            )
            }
            <form className="block max-w-sm mx-auto mb-4" onSubmit={e=>handleFormSubmit(e)}>
                <input type="email" placeholder="Email" value={email} 
                disabled={creatingUser}
                onChange={(e)=>setEmail(e.target.value)}/>
                <input type="password" value={password} placeholder="Password"
                onChange={(e)=>setPassword(e.target.value)}
                    disabled={creatingUser}
                />
                <button type="submit" disabled={creatingUser}>Register</button>
                <div className="my-4 text-center text-gray-500">or login with provider</div>
                <button onClick={()=>signIn('google',{callbackUrl:"/"})} className="flex gap-4 justify-center items-center">
                <Image src={'/googleIcon.png'} alt={''} width={32} height={24}></Image>
                Login with google
                </button>
                <div  className="text-center my-4 text-gray-500 border-t pt-4">
                    Existing account? <Link className="underline" href={'/login'}>Login here &raquo;</Link>
                </div>
            </form>
        </section>
    )
}