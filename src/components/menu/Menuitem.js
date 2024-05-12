import { useContext, useState } from "react";
import { CartContext } from "../AppContext";
import toast from "react-hot-toast";
import MenuItemTile from "@/components/menu/MenuItemTile";
import Image from "next/image"
import FlyingButton from "react-flying-item";


export default function MenuItem(menuItem){
    const {image,name,description,basePrice,sizes,extraIngredientPrices}=menuItem;
    const [showPopup,setShowPopup]=useState(false);
    const {addToCart}=useContext(CartContext);
    const [selectedSize,setSelectedSize]=useState(sizes?.[0] || null);
    const [selectedExtras,setSelectedExtras]=useState([]);

    const  handleAddToCartButtonClick=async()=>{
        const hasOptions=sizes.length>0 ||  extraIngredientPrices.length>0;
        if(hasOptions && !showPopup)
        {
            setShowPopup(true);
            return;
        }
            addToCart(menuItem,selectedSize,selectedExtras);
            await new Promise(resolve=>setTimeout(resolve,1000));
            setShowPopup(false);
        toast.success("Added to cart");
    }

    const handleExtraThingClick=(e,extraThing)=>{
        if(e.target.checked)
        {
            setSelectedExtras(prev=>[...prev,extraThing]);
        }
        else
        {
            setSelectedExtras(prev=>{
                 return (prev.filter(e=>e.name!==extraThing.name));
            })
        }
    }

    let selectedPrice=basePrice;
    if(selectedSize)
    {
        selectedPrice+=selectedSize.price;
    }
    if(selectedExtras?.length>0)
    {
        for(const extra of selectedExtras)
        {
            selectedPrice+=extra.price;
        }
    }
    return (
        <>
        {
            showPopup && (
                <div className="fixed inset-0 bg-black/80 flex items-center justify-center"
                onClick={()=>setShowPopup(false)}>
                    <div onClick={e=>e.stopPropagation()}
                     className="bg-white rounded-lg max-w-sm p-2 my-8">
                    <div className="overflow-y-scroll p-2" style={{maxHeight:'calc(100vh - 100px)'}}>
                    <Image src={image} alt={name} width={200} height={100} className="mx-auto" />
                    <h2 className="text-lg font-bold text-center mb-2">{name}</h2>
                    <p className="text-center text-gray-500 mb-2 text-sm">{description}</p>
                    {
                        sizes?.length >0 && (
                            <div className="rounded-md py-2">
                                <h3 className="text-center text-gray-700">Pick your size </h3>
                                <div className="flex gap-2 items-center justify-evenly">
                                {
                                    sizes.map((size,i)=>(
                                        <label key={i}
                                        onClick={()=>setSelectedSize(size)}
                                        checked={selectedSize?.name===size.name}
                                         className="border flex items-center p-2 rounded-md">
                                            <input type="radio" name="size"
                                            />
                                            {size.name}&nbsp;₹{basePrice+size.price}
                                        </label>
                                    ))
                                }
                                </div>
                            </div>
                        )
                    }
                    {
                        extraIngredientPrices?.length >0 && (
                            <div className="rounded-md py-2">
                                <h3 className="text-center text-gray-700">Pick your extra Ingredients</h3>
                                <div className="flex gap-2 items-center justify-evenly mb-6">
                                {
                                    extraIngredientPrices.map((extraThing,i)=>(
                                        <label key={i}
                                        onClick={e=>{
                                            handleExtraThingClick(e,extraThing);
                                        }}
                                         className="border flex items-center p-2 rounded-md">
                                            <input type="checkbox" name={extraThing.name}/>
                                            {extraThing.name} +₹{extraThing.price}
                                        </label>
                                    ))
                                }
                                </div>
                                <FlyingButton targetTop={'5%'}
                                targetLeft={'95%'}
                                src={image}
                                >
                                <div className="primary sticky bottom-2 button"  onClick={handleAddToCartButtonClick}>
                                Add to cart ₹{selectedPrice}
                                </div>
                                </FlyingButton>
                                <button className="mt-2" onClick={()=>setShowPopup(false)}>Cancel</button>
                            </div>
                        )
                    }
                    </div>    
                    </div>
                </div>
            )
        }
                    <MenuItemTile onAddToCart={handleAddToCartButtonClick} {...menuItem} />
        </>
    );
}