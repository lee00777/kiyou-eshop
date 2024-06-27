import React from 'react';
import { useEffect, useState} from 'react';
import { useNavigate } from "react-router-dom"

export default function NotFound() {
  const navigate = useNavigate();
  const [countdown, setCountdown] = useState(3);
  
  useEffect(() => {
    const timer = setInterval(() => {
      setCountdown(prev => {
        if (prev === 1) {
          navigate(`/`);
          return prev;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(timer); 
  }, [navigate]);
  
  return (
    <div className="text-brand flex flex-col text-3xl text-bold justify-center items-center h-screen">
      <p>Oops.. Something went wrong!</p>
      <p className="mt-4 text-black text-lg">Redirecting to homepage in {countdown} second(s)... </p>
    </div>
  );
}

