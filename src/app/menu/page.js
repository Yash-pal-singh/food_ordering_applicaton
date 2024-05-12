"use client"

import SectionHeaders from "@/components/layouts/SectionHeaders";
import Menuitem from "@/components/menu/Menuitem";
import { useEffect, useState } from "react"

export default function Menu(){
    const [categories,setCategories]=useState([]);
    const [menuItems,setMenuItems]=useState([]);

    useEffect(()=>{
        fetch('/api/categories').then(response=>{
            response.json().then(categories=>{
                setCategories(categories);
                console.log(categories);
            })
        });
        fetch('/api/menu-items').then(response=>{
            response.json().then(menuItems=>{
                setMenuItems(menuItems);
                console.log("menu itm",menuItems);
            });
        })
    },[])
    return (
        <section className="mt-8">
          {
            categories?.length >0 && categories.map((c,i)=>(
                <div key={c._id}>
                <div className="text-center">
                    <SectionHeaders mainHeaders={c.name}  />
                </div>
                <div className="grid grid-cols-3 gap-4 mt-6 mb-8">
                {
                    menuItems.filter(item=>item.category===c._id).map((item,i)=>(
                        <Menuitem {...item} key={item._id}/>
                    ))
                }        
                </div>
                </div>
            ))
          }
        </section>
    )
}