import Trash from "@/components/icons/Trash";
import Plus from "@/components/icons/Plus";
import ChevronDown from "@/components/icons/ChevronDown";
import ChevronUp from "@/components/icons/ChevronUp";
import { useState } from "react";

export default function MenuItemPriceProps({ addLabel, name, sizes, setSizes }) {
    const [isOpen, setIsOpen] = useState(false);

    const addSizes = () => {
        setSizes(oldSizes => {
            return [...oldSizes, { name: '', price: 0 }]
        })
    }

    const editSize = (e, index, property) => {
        const newValue = e.target.value;
        setSizes(prevSizes => {
            const newSizes = [...prevSizes];
            newSizes[index][property] = newValue;
            return newSizes;
        })
    }

    const removeSizes = (removeIndex) => {
        setSizes(prev => prev.filter((v, i) => i !== removeIndex));
    }
    return (
        <div className="bg-gray-200 p-2 rounded-md mb-2">
            <button type="button" className="inline-flex p-1 border-0 justify-start" onClick={()=>setIsOpen(prev=>!prev)}>
               {
                isOpen && (<ChevronDown />)
               }
               {
                !isOpen && (<ChevronUp />)
               }
                <span>{name}</span>
                <span>({sizes?.length})</span>
            </button>
            <div className={isOpen?'block':'hidden'}>
                {
                    sizes?.length > 0 && sizes.map((size, i) => (
                        <div className="flex gap-2 items-end" key={i}>
                            <div>
                                <label>name</label>
                                <input type="text" placeholder="Size name" onChange={e => editSize(e, i, 'name')}
                                    value={size.name}></input>
                            </div>
                            <div>
                                <label>Extra price</label>
                                <input type="text" placeholder="Extra price" onChange={e => editSize(e, i, 'price')} value={size.price}></input>
                            </div>
                            <div>
                                <button type="button"
                                    onClick={() => removeSizes(i)} className="bg-white mb-2 px-2">
                                    <Trash />
                                </button>
                            </div>     
                        </div>
                    ))          
                }
                <button type="button"
                onClick={addSizes} className="bg-white flex items-center"
            >
                <Plus className="w-4 h-4" />
                {addLabel}
            </button>
            </div>      
        </div>
    )
}