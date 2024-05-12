"use client"

import { useEffect } from "react";
import { useState } from "react";

export default function FetchProfile(){
    const [data,setData]=useState(false);
  const [loading,setLoading]=useState(true);
    useEffect(()=>{
      setLoading(true);
      fetch('/api/profile').then(response=>{
        response.json().then(user=>{
          setData(user.user);
          setLoading(false);
        })
      });
    },[]);
    return {loading,data};
}