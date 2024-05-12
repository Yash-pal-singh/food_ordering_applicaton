"use client"

import Tabs from "@/components/layouts/Tabs";
import useProfile from "@/components/FetchProfile";
import { redirect, useParams, usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import UserForm from "@/components/layouts/UserForm";
import toast from "react-hot-toast";

export default function EditPage(){
    const [redirectToItems,setRedirectToItems]=useState(false);
    const path=usePathname();
    const {id}=useParams();
    const [user,setUser]=useState(null);
    const { loading, data } = useProfile();

    useEffect(()=>{
        fetch('/api/users').then(response=>{
            response.json().then(users=>{
                const user=users.find(u=>u._id===id);
                setUser(user);
            })
        })
    },[id])
    
    if (loading) {
        return 'Loading user info...'
    }
    if (!data.admin) {
        return 'Not an admin';
    }

    const handleSaveButtonClick=async(e,data)=>{
        e.preventDefault();
        const savingPromise=new Promise(async(resolve,rejected)=>{
            const response=await fetch('/api/profile',{
                method:'PUT',
                headers:{'Content-Type':'application/json'},
                body:JSON.stringify({...data,_id:id})
            })
            if(response.ok) resolve();
            else rejected();
        })
        await toast.promise(savingPromise,{
            loading:'Saving...',
            success:'User profile saved.',
            error:'Error!'
        })
        setRedirectToItems(true);
    }

    if(redirectToItems)
    {
        return redirect('/users');
    }

    return(
        <section className="mt-8 mx-auto max-w-2xl">
            <Tabs isAdmin={true} path={path}/>
            <div className="mt-8">
                <UserForm user={user} onSave={handleSaveButtonClick}/>
            </div>
        </section>
    )
}