"use client"

import EditableImage from "@/components/layouts/EditableImage";
import { useState } from "react";
import useProfile from "@/components/FetchProfile";
import AddressInput from "./AddressInput";


export default function UserForm({user,onSave}){
    const [public_id,setPublic_id]=useState(user?.public_id || "");
    const [userName, setUserName] = useState(user?.name || "");
    const [image,setImage]=useState(user?.image || "");
    const [phone,setPhone]=useState(user?.phone || "");
    const [email,setEmail]=useState(user?.email || "");
    const [streetAddress,setStreetAddress]=useState(user?.streetAddress || "");
    const [postalCode,setPostalCode]=useState(user?.postalCode || "");
    const [city,setCity]=useState(user?.city || "");
    const [country,setCountry]=useState(user?.country || "");
    const [admin,setAdmin]=useState(user?.admin || false);
    const {data:loggedInUserData}=useProfile();


    const handleAddressChange=(propName,val)=>{
        if(propName=='city') setCity(val);
        if(propName=='phone') setPhone(val);
        if(propName=='country') setCountry(val);
        if(propName=='postalCode') setPostalCode(val);
        if(propName=='streetAddress') setStreetAddress(val);
    }
    return (
        <div className="flex gap-4">
                    <EditableImage link={image} setLink={setImage} setPublic_id={setPublic_id}/>
                    <form className="grow" onSubmit={e=>onSave(e,{
                        public_id,name:userName,email,image,phone,streetAddress,postalCode,city,country,admin
                    })}>
                         <label>
                            First and Last name
                         </label>
                        <input type="text" placeholder="First and last name" value={userName} onChange={e => setUserName(e.target.value)} />
                        <label>
                            Email
                         </label>
                        <input type="email" disabled={true} value={email}></input>
                        <AddressInput addressProps={{streetAddress,phone,postalCode,city,country}} setAddressProps={handleAddressChange} />
                        {
                            loggedInUserData.admin && (
                                <div>
                            <label className="p-2 inline-flex items-center gap-2 mb-2" htmlFor="adminCb">
                            <input id="adminCb" type="checkbox" className=""
                            value={'1'}
                            checked={admin}
                                onClick={e=>setAdmin(e.target.checked)}
                            />
                                <span>Admin</span>
                            </label>
                         </div>
                            )
                         }
                        <button type="submit">Save</button>
                    </form>
                </div>
        
    )
}