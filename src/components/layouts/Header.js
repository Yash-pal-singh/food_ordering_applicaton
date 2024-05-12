"use client"
import { useSession,signOut } from "next-auth/react";
import Link from "next/link";
import { useContext } from "react";
import { CartContext } from "../AppContext";
import ShoppingCart from "@/components/icons/ShoppingCart";


export default function Header(){
  const session=useSession();
  const userData=session?.data?.user;
  let userName=userData?.name|| userData?.email;
  const {cartProducts}=useContext(CartContext);
  if(userName && userName.includes(" ")) userName=userName.split(" ")[0];
  const status=session?.status;

    return(
        <header className="flex items-center justify-between">
        <nav className="flex items-center gap-8 text-gray-500 font-semibold">
        <Link className="text-primary font-semibold text-2xl" href={'/'}>
        XYZ PIZZA
        </Link>
          <Link href={'/'}>Home</Link>
          <Link href={'/menu'}>Menu</Link>
          <Link href={'/#about'}>About</Link>
          <Link href={'/#contact'}>Contact</Link>
        </nav>
        <nav className="flex items-center gap-4 text-gray-500 font-semibold">
        {status==="authenticated" && (
          <>
            <Link href={"/profile"} className="whitespace-nowrap">
            Hello, {userName}</Link>
          <button onClick={()=>signOut("google")} className="bg-primary text-white px-8 py-2 rounded-full">Logout</button>

          </>
        )}
        {
          status==="unauthenticated" && (
            <>
            <Link href="/login">Login</Link>
          <Link href={'/register'} className="bg-primary text-white px-8 py-2 rounded-full">Register</Link>
            </>
          )
        }
            <Link href={'/cart'} className="relative">
            <ShoppingCart />
            <span className="absolute -top-2 -right-4 bg-primary text-white text-xs px-1 py-1 rounded-full leading-3">{cartProducts.length}</span>
            </Link>
        </nav>
      </header>
    )
}