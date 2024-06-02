import React from 'react';
import { useEffect } from 'react';
import { useNavigate } from "react-router-dom"

export default function NotFound() {
  const navigate = useNavigate();
  
  useEffect(()=>{
    setInterval(()=>{
      navigate(`/`)
    }, 7000)
  },[navigate])
  
  return (
    <div className="text-brand flex flex-col text-3xl text-bold justify-center items-center h-screen">
      <p>Oops.. Something went wrong!</p>
      <p className="mt-4 text-black text-lg">Redirecting to homepage... </p>
    </div>
  );
}

