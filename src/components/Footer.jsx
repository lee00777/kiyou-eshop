import React from 'react';
import { FaLinkedin } from "react-icons/fa6";
import { SiGmail } from "react-icons/si";
import { ImHome } from "react-icons/im";

export default function Footer() {
  return (
    <div className="min-h-100 relative">
      <footer className='w-full  h-40 bg-description text-white'>
        <div className='flex w-4/6 mx-auto pt-10 justify-between'>
          <a className="cursor-pointer" href="https://www.linkedin.com/in/gyuyounglee13/"><FaLinkedin className="text-2xl" /></a>
          <a className="cursor-pointer" href="http://www.gyuyoung.com"><ImHome className="text-2xl" /></a>
          <a className="cursor-pointer" href="mailto:gylee285@gmail.com"><SiGmail className="text-2xl" /></a>
        </div>
        <div className='pt-10 mx-auto grid grid-rows-1 justify-center'>
          <p className='font-semibold'>Copyright © 2024, Gyuyoung Lee. All Rights Reserved.</p>
        </div>
      </footer>
    </div>

  );
}

