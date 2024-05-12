"use client"

import Tabs from "@/components/layouts/Tabs"
import { redirect, usePathname } from "next/navigation";
import useProfile from "@/components/FetchProfile";
import { useState } from "react";
import toast from "react-hot-toast";
import Link from "next/link";
import Left from "@/components/icons/Left";
import MenuITemForm from "@/components/layouts/MenuItemForm";

export default function NewMenuItemPage(){
    const {loading,data}=useProfile();
    const [redirectToItems,setRedirectToItems]=useState(false);
    const path=usePathname();
    if(loading) return 'Loading user info...';
    if(!data.admin) return 'Not an admin.';

    if(loading)
    {
        return 'Loading user info...';
    }
    if(!data.admin)
    {
        return "Not an admin."
    }

    const handleFormSubmit=async(e,data)=>{
        e.preventDefault();
        const savingPromise=new Promise(async(resolve,rejected)=>{
            const response= await fetch('/api/menu-items',{
            method:'POST',
            headers:{'Content-Type':'application/json'},
            body:JSON.stringify(data)
            });
            if(response.ok)
            {
                resolve();
            }else rejected();
        });

        await toast.promise(savingPromise,{
            loading:'Saving this tasty item',
            success:'Saved',
            error:'Error',
        })
        setRedirectToItems(true);
        
    }
    if(redirectToItems)
    {
        return redirect('/menu-items');
    }
    return (
        <section className="mt-8">
           <Tabs isAdmin={true} path={path}/>
           <div className="max-w-2xl mx-auto mt-8">
            <Link href={'/menu-items'} className="button">
                <Left/>
                <span>Show all menu  items</span>
            </Link>
           </div>
           <MenuITemForm onSubmit={handleFormSubmit} menuItem={null}/>
        </section>
    );
}