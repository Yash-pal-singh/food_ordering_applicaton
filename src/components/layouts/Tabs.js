import Link from "next/link";

export default function Tabs({isAdmin,path}){
    return (
        <div className="flex gap-2 tabs justify-center">
            <Link className={path==='/profile'?'active':''} 
            href={'/profile'}>
            Profile</Link>
            {
                isAdmin && (
                    <>
                        <Link className={path==='/categories'?'active':''} href={'/categories'}>categories</Link>
                        <Link className={path.includes('menu-items')?'active':''}  href={'/menu-items'}>Menu Items</Link>
                        <Link className={path.includes('/users')?'active':''}  href={'/users'}>Users</Link>
                        <Link className={path==='/orders'?'active':''}  href={'/orders'}>Orders</Link>
                    </>)
            }
        </div>
    )
}