import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { BsFillPencilFill } from 'react-icons/bs';
import { useAuthContext } from "../contexts/AuthContext";
import User from './User';
import Button from './UI/Button';
import CartStatus from './CartStatus';

const LINKSTYLE = "text-xs lg:text-base hover:underline decoration-solid";

export default function Navbar() {
  const { user, login, logout } = useAuthContext();
  const [ hideSection, setHideSection ] = useState(false);

  useEffect(()=>{
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      setHideSection(scrollPosition > 0);
    };
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  },[])

  return (
    <header className='w-full flex flex-row'>
      <section className='w-full fixed top-0 left-0 z-50 bg-white'>
        <section className={`w-full h-10  content-center text-center text-white bg-brand ${hideSection ? 'hidden' : ''}`}>
          <p>FREE SHOPPING FOR ORDERS ABOVE <b>$300</b></p>
        </section>
        <div className='flex justify-between border-b border-gray-300 p-2 h-16 mx-2'>
          <Link to='/' className='flex items-center text-4xl text-brand mr-5'>
            <h1 className='tracking-widest'>KIYOU</h1>
          </Link>
          <nav className='flex items-center gap-4 truncate overflow-scroll '>
            <Link to='/best' className={LINKSTYLE}>BEST❣️</Link>
            <Link to="/new" className={LINKSTYLE}>NEW 🌿</Link>
            <Link to="/sales" className={LINKSTYLE}>HOT SALES 🔥</Link>
            <Link to="/products/skirts" className={LINKSTYLE}>SKIRTS</Link>
            <Link to="/products/dresses" className={LINKSTYLE}>DRESSES</Link>
            <Link to="/products/pants" className={LINKSTYLE}>PANTS</Link>
            <Link to="/products/shirts" className={LINKSTYLE}>SHIRTS</Link>
            <Link to="/products/cardigans" className={LINKSTYLE}>CARDIGANS</Link>
            <Link to="/products/outers" className={LINKSTYLE}>OUTERS</Link>
            <Link to="/products/accessories" className={LINKSTYLE}>ACCESSORIES</Link>
            {/* <Link to='/products'>Products</Link> */}
            {user && <Link to='/carts' className="cursor-pointer">
                <CartStatus />
            </Link>}
            {user && user.isAdmin && (
              <Link to='/products/new' className='text-2xl cursor-pointer'>
                <BsFillPencilFill />
              </Link>
            )}
            {user && <User user={user} />}
            {!user && <Button text={'Login'} onClick={login} />}
            {user && <Button text={'Logout'} onClick={logout} />}
          </nav>
        </div>
      </section>
    </header>
  );
}
