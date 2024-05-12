"use client"

import { CartContext, cartProductPrice } from "@/components/AppContext"
import SectionHeaders from "@/components/layouts/SectionHeaders"
import Image from "next/image";
import { useContext, useEffect, useState } from "react"
import Trash from "@/components/icons/Trash";
import AddressInput from "@/components/layouts/AddressInput";
import useProfile from "@/components/FetchProfile";

export default function Cart() {
    const { cartProducts,removeCartProduct } = useContext(CartContext);
    const [address,setAddress]=useState("");
    const {data:profileData}=useProfile();
    let total=0;

    useEffect(()=>{
        if(profileData?.city)
        {
            const {phone,streetAddress,city,postalCode,country}=profileData;
            const addressFromProfile={phone,streetAddress,city,postalCode,country};
            setAddress(addressFromProfile);
        }
    },[profileData])
    for(const p of cartProducts)
    {
        total+=cartProductPrice(p);
    }

    const handleAddressChange=(propName,value)=>{
        setAddress(prevAddress=>{ return {...prevAddress,[propName]:value}})
    }
    return (
        <section className="mt-8">
            <div className="text-center">
                <SectionHeaders mainHeaders="Cart" />
            </div>
            <div className="mt-8 grid grid-cols-2 gap-8">
                <div>
                    {cartProducts?.length === 0 && (
                        <div>No product in your shopping cart</div>
                    )
                    }
                    {
                        cartProducts?.length > 0 && cartProducts.map((product, i) => (
                               <div key={i} className="flex items-center gap-4  border py-4">
                                <div className="w-24 h-20  relative">
                                    <Image fill src={product.image} alt={''} />
                                </div>
                                <div className="grow">
                                <h3 className="font-semibold">{product.name}</h3>
                                {
                                    product.size && (
                                        <div className="text-sm ">Size: <span>{product.size.name}</span></div>
                                    )
                                }
                                {
                                    product.extras?.length > 0 && (
                                        <div >
                                            {
                                                product.extras.map((extra, i) => (
                                                    <div key={i}>
                                                        {extra.name} ₹{extra.price}
                                                    </div>
                                                ))}
                                        </div>
                                    )}
                                </div>
                                <div className="text-lg font-semibold">
                                ₹{cartProductPrice(product)}
                                </div>
                                <div className="ml-2">
                                   <button 
                                   type="button"
                                   onClick={()=>removeCartProduct(i)}
                                   className="p-2"><Trash /></button>
                               </div>
                            </div>
                        ))}
                        <div className="py-2 text-right pr-16">
                            <span className="text-gray-500">Subtotal: </span>
                            <span className="font-semibold text-lg pl-2">₹{total}</span>
                        </div>
                </div>
                <div className="bg-gray-100 p-4 rounded-lg">
                    <h3>Checkout</h3>
                    <form>
                        <AddressInput addressProps={address} setAddressProps={handleAddressChange}/>
                        <button type="submit">Pay ₹{total}</button>
                    </form>
                </div>
            </div>
        </section>
    )
}