import { useState } from "react"

export default function DeleteButton({label,onDelete}){
    const [showConfirm,setShowConfirm]=useState(false);
    if(showConfirm){
        return (
            <div className="fixed bg-black/80 inset-0 flex items-center justify-center h-full">
            <div className=" bg-white p-4 rounded-md">
            <div>Are you sure you want to delete?</div>
            <div className="flex gap-2 mt-1">
                <button type="button" onClick={()=>setShowConfirm(false)}>Cancel</button>
                <button type="button" className="primary"
                onClick={()=>{
                    onDelete();
                    setShowConfirm(false);
                    }}>Yes,&nbsp;delete!</button>
            </div>
            </div>
            </div>
        )
    }

    return (
        <button type="button" onClick={()=>setShowConfirm(true)}>
            {label}
        </button>
    )
}