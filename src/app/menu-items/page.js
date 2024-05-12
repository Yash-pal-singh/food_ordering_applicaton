"use client"

import useProfile from "@/components/FetchProfile";
import Right from "@/components/icons/Right";
import Tabs from "@/components/layouts/Tabs"
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import Image from "next/image";


export default function MenuItemsPage(){
    const [menuItems,setMenuItems]=useState([]);
    const path=usePathname();

    useEffect(()=>{
        fetch('/api/menu-items').then(res=>{
         res.json().then(menuItems=>{
             setMenuItems(menuItems);
         })
        })
     },[])

    const {loading,data}=useProfile();
    if(loading)
    {
        return 'Loading user info...';
    }
    if(!data.admin)
    {
        return "Not an admin."
    }
    
    return (
        <section className="mt-8 max-w-2xl mx-auto">
           <Tabs isAdmin={true} path={path}/>
           <div className="mt-8">
              <Link className="button flex" href={'/menu-items/new'}>
              <span> Create new item</span>
             <Right/>
              </Link>
           </div>
           <div>
            <h2 className="text-sm text-gray-500 mt-8">Edit menu item:</h2>
            <div className="grid grid-cols-3 gap-2">
            {
                menuItems?.length>0 && menuItems.map((item,i)=>(
                    <Link key={i} href={'/menu-items/edit/'+item._id} 
                    className="bg-gray-200 rounded-lg p-4 flex flex-col items-center">
                    <div className="relative h-[150px] w-[170px]">
                      <Image className="rounded-md" src={item.image} alt={''} fill />
                    </div>
                    <div className="text-center">
                    {item.name}
                    </div>
                    </Link>
                ))
            }
            </div>
           </div>
        </section>
    )
}
