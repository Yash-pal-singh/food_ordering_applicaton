"use client"

import Tabs from "@/components/layouts/Tabs";
import useProfile from "@/components/FetchProfile";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import Link from "next/link";

export default function UsersPage() {
    const path = usePathname();
    const { loading, data } = useProfile();
    const [users, setUsers] = useState([]);

    useEffect(() => {
        fetch('/api/users').then(response => {
            response.json().then(users => {
                setUsers(users);
            })
        })
    }, [])

    if (loading) {
        return 'Loading user info...'
    }
    if (!data.admin) {
        return 'Not an admin';
    }

    return (
        <section className="max-w-2xl mx-auto mt-8">
            <Tabs isAdmin={true} path={path} />
            <div className="mt-8">
                {
                    users?.length > 0 && users.map((user, i) => (
                        <div className="bg-gray-100 rounded-lg mb-2 p-1   px-4 flex items-center gap-4" key={i}>
                            <div className="grid grid-cols-2 gap-4 grow md:grid-cols-3">
                                <div className="text-gray-900">
                                    {
                                        user.name && (<span>{user.name}</span>)
                                    }
                                    {
                                        !user.name && (<span className="italic">No Name</span>)
                                    }
                                </div>
                                <span className="text-gray-500">{user.email}</span>
                            </div>
                            <div>
                                <Link className="button" href={'/users/'+user._id}>Edit</Link>
                            </div>
                        </div>
                    ))
                }
            </div>
        </section>
    )
}