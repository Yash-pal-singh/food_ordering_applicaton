"use client";

import Image from 'next/image';
import MenuItem from '../menu/Menuitem';
import SectionHeaders from './SectionHeaders';
import { useEffect, useState } from 'react';

export default function HomeMenu(){
  const [bestSellers,setBestSellers]=useState([]);
  useEffect(()=>{
    fetch('/api/menu-items').then(res=>{
      res.json().then(menuItems=>{
            const bestSellers=menuItems.slice(-3);
            setBestSellers(bestSellers);
      })
    })
  },[]);
    return (
    <section className="">
    <div className="absolute left-0 right-0 w-full">
      <div className='absolute left-0 -top-[70px] text-left -z-10'>
        <Image src={'/sallad1.png'} height={189} width={109} alt={'salad'}
        ></Image>
      </div>
      <div className='absolute right-0 -top-[100px] -z-10'>
        <Image src={'/sallad2.png'} height={195} width={107} alt={'salad'}
        ></Image>
      </div>
    </div>
    <SectionHeaders
     subHeaders={"check out"} 
     mainHeaders={"Our Best Sellers"}/>
      <div className='grid grid-cols-3 gap-4'>
          {
            bestSellers?.length >0 && bestSellers.map((item,i)=>(
              <MenuItem {...item} key={i}/>
            ))
          }
      </div>
      </section>
    )
}
