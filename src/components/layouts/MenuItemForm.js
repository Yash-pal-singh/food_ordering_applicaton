"use client"

import { useEffect, useState } from "react";
import EditableImage from "../layouts/EditableImage";
import MenuItemPriceProps from "@/components/layouts/MenuItemPriceProps";
export default function MenuITemForm({onSubmit,menuItem}){

    const [image,setImage]=useState(menuItem?.image || '');
    const [name,setName]=useState(menuItem?.name || '');
    const [description,setDescription]=useState(menuItem?.description || '');
    const [basePrice,setBasePrice]=useState(menuItem?.basePrice || '');
    const [public_id,setPublic_id]=useState(menuItem?.public_id || '');
    const [sizes,setSizes]=useState(menuItem?.sizes || []);
    const [extraIngredientPrices,setExtraIngredientPrices]=useState(menuItem?.extraIngredientPrices || []);
    const [category,setCategory]=useState(menuItem?.category || null);
    const [categories,setCategories]=useState([]);

    useEffect(()=>{
        fetch('/api/categories').then(res=>{
                res.json().then(categories=>{
                    setCategories(categories);
                });
        })
    },[])

    return (
        <form className="mt-8 max-w-2xl mx-auto" onSubmit={e=>{
            console.log("current category ",category);
            onSubmit(e,{image,name,description,basePrice,public_id,sizes,extraIngredientPrices,category});
        }}>
                <div className="flex items-start gap-4">
                    <div>
                       <label>Image</label>
                        <EditableImage link={image} setLink={setImage} setPublic_id={setPublic_id}/>
                    </div>
                    <div className="grow">
                            <label>Item name</label>
                            <input type="text" value={name} onChange={e=>setName(e.target.value)}/>
                            <label>Description</label>
                            <input type="text" value={description} onChange={e=>setDescription(e.target.value)}/>
                            <label>Category</label>
                            <select value={category} onChange={e=>{
                                console.log(e.target.value);
                                setCategory(e.target.value)}}>
                                {categories?.length>0 && categories.map((c,i)=>(
                                    <option value={c._id} key={c._id}>{c.name}</option>
                                )
                                )}
                            </select>
                            <label>Base price</label>
                            <input type="text" value={basePrice} onChange={e=>setBasePrice(e.target.value)}/>
                            <MenuItemPriceProps name={'Sizes'} addLabel={'Add item size'} sizes={sizes} setSizes={setSizes}/>
                            <MenuItemPriceProps name={'Extra Ingredient'} addLabel={'Add Ingredient prices'} sizes={extraIngredientPrices} setSizes={setExtraIngredientPrices}/>
                            <button type="submit">Save</button>
                    </div>
                </div>
           </form>
    )
}