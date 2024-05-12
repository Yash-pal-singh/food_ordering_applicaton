"use client"

import Tabs from "@/components/layouts/Tabs"
import { redirect, useParams, usePathname } from "next/navigation";
import useProfile from "@/components/FetchProfile";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import Link from "next/link";
import Left from "@/components/icons/Left";
import MenuITemForm from "@/components/layouts/MenuItemForm";
import DeleteButton from "@/components/DeleteButton";

export default function EditMenuItemPage(){
    const {id}=useParams();
    const [menuItem,setMenuItem]=useState(null);
    const {loading,data}=useProfile();
    const [redirectToItems,setRedirectToItems]=useState(false);
    const path=usePathname();
    useEffect(()=>{
        fetch('/api/menu-items').then(res=>{
            res.json().then(items=>{
                const item=items.find(i=>i._id===id);
                setMenuItem(item);
            })
    })
    },[id])
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

    const handleFormSubmit=async(e,d)=>{
        e.preventDefault();
        const data={...d,_id:id};
        const savingPromise=new Promise(async(resolve,rejected)=>{
            const response= await fetch('/api/menu-items',{
            method:'PUT',
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

    const handleDeleteClick=async()=>{
        const promise=new Promise(async(resolve,rejected)=>{
            const response=await fetch('/api/menu-items?_id='+id,{
                method:'DELETE',
                headers:{'content-type':'application/json'},
                body:JSON.stringify({public_id:menuItem.public_id})
            })
            if(response.ok)
            {

                resolve();
            }
            else
            {
                rejected();
            }
        });
        await toast.promise(promise,{
            loading:'Deleting...',
            success:'Deleted',
            error:'Error'
        })
        setRedirectToItems(true);

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
           <MenuITemForm onSubmit={handleFormSubmit} menuItem={menuItem} />
           <div className="max-w-2xl mx-auto mt-2">
           <div className="max-w-lg ml-auto pl-8">
           <DeleteButton label="Delete this menu item"
           onDelete={handleDeleteClick} />
           </div>
           </div>
        </section>
    );
}