"use client"

import Tabs from "@/components/layouts/Tabs"
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import useProfile from "@/components/FetchProfile";
import toast from "react-hot-toast";
import DeleteButton from "@/components/DeleteButton";

export default function CategoriesPage(){
  const {loading:profileLoading,data:profileData}=useProfile();
  const [categoryName,setCategoryName]=useState("");
  const [categories,setCategories]=useState([]);
  const [editedCategory,setEditedCategory]=useState(null);
  const path=usePathname();

  useEffect(()=>{
     fetchCategories();
  },[])

  function fetchCategories(){
    fetch('/api/categories').then(res=>res.json().then(categories=>{
      setCategories(categories);
    }));
  }

  if(profileLoading)
   {
     return 'Loading user info...'
   }
   if(!profileData.admin)
   {
    return 'Not an admin';
   }


   const handleCategorySubmit=(e)=>{
    e.preventDefault();
    const creationPromise=new Promise(async(resolve,rejected)=>{
      const data={name:categoryName};
      if(editedCategory)
      {
        data._id=editedCategory._id;
      }
      const response=await fetch('api/categories',{
        method:editedCategory?'PUT':'POST',
        headers:{'Content-Type':'application/json'},
        body:JSON.stringify(data)
      });
      fetchCategories();
      setCategoryName("");
      setEditedCategory(null);
      if(response.ok) resolve();
      else rejected();
    });
    toast.promise(creationPromise,{
      loading:editedCategory?'Updating category...':'Creating your new Category...',
      success:editedCategory?'Category Updated':'Category created!',
      error:'Error,sorry..',
    })
   }

  const handleDelete=async(_id)=>{
    const promise=new Promise(async(resolve,rejected)=>{
      const response=await fetch('/api/categories?_id='+_id,{
       method:'DELETE',
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
      loading:'Deleting',
      success:'Deleted',
      error:'Error'
    })
      fetchCategories();
      setEditedCategory(null);
      setCategoryName("");
  }
    return(
        <section className="mt-8 mx-w-2xl mx-auto">
          <Tabs isAdmin={true} path={path}/>
         <form className="mt-8 " onSubmit={handleCategorySubmit}>
         <div className="flex gap-2 items-end">
            <div className="grow">
            <label>{editedCategory ? 'Update category':'New category name'}
            {editedCategory && (<>
              : <b>{editedCategory.name}</b>
            </>)}
            </label>
             <input type="text" value={categoryName} onChange={e=>setCategoryName(e.target.value)}/>
            </div>
            <div className="pb-2 flex gap-2">
              <button className="border border-primary" type="submit">
              { editedCategory ? 'Update':'Create'}
              </button>
              <button type="button" onClick={()=>{
              setEditedCategory(null);
              setCategoryName('');
              }}>Cancel</button>
            </div>
         </div>
            
         </form>
         <div>
         <h2 className="mt-8 text-sm text-gray-500">Existing categories:</h2>
           {
            categories?.length>0 && categories.map((category,i)=>(
              <div
              key={i} 
              className="bg-gray-100 rounded-xl p-2 px-4 flex gap-1 mb-1 items-center">
               <div className="grow"
               >{category.name}</div>   
                <div className="flex gap-1">
                    <button type="button"
                    onClick={()=>{setEditedCategory(category);
                     setCategoryName(category.name)}}
                    >Edit</button>
                    <DeleteButton label="Delete" onDelete={()=>handleDelete(category._id)} />
                </div>
              </div>
            ))
           }
         </div>
        </section>
    )
}