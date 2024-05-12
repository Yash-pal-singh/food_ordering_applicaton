"use client"
import { useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { redirect, usePathname } from "next/navigation";
import { useState, useEffect } from "react"; 
import toast from "react-hot-toast";
import Tabs from "@/components/layouts/Tabs"

import UserForm from "@/components/layouts/UserForm";

export default function ProfilePage() {
    const session = useSession();
    const { status } = session;
    
    const [isAdmin,setIsAdmin]=useState(false);
    const [profileFetched,setProfileFetched]=useState(false);
    const path=usePathname();
    const [user,setUser]=useState(null);

    useEffect(() => {
        if (status === "authenticated") {
            fetch('/api/profile').then((response)=>{
                response.json().then(user=>{
                    setUser(user.user);
                    setIsAdmin(user.user.admin);
                    setProfileFetched(true);
                });
            })
        }
    }, [session,status]);

    if (status == "loading" || !profileFetched) {
        return "loading..."
    }
    if (status === "unauthenticated") {
        return redirect("/login");
    }
    const handleProfileInfoUpdate =async(e,data) => {
        e.preventDefault();
        const savingPromise=new Promise(async(resolve,rejected)=>{
            const response = await fetch("/api/profile", {
                method: 'PUT',
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(data),
            });
            if(response.ok){ 
                resolve();
            }
            else rejected();
        });
        await toast.promise(savingPromise,{
            loading:'Saving...',
            success:'Profile saved!',
            error:'Error'
        })

        
    }
    
    return (
        <section className="mt-8">
        {isAdmin && <Tabs isAdmin={isAdmin} path={path}/>}
        <div className="max-w-2xl mx-auto mt-8">
                <UserForm user={user} onSave={handleProfileInfoUpdate}/>
            </div>
        </section>
    )
}