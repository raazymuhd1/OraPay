"use client"
import React from 'react'
import Link from 'next/link'
import Links from './Links'
import { CgMenuOreos } from "react-icons/cg";

const Nav = () => {
  return (
    <nav className="flex items-center md:justify-around justify-between w-[90%] md:w-[100%] mx-auto h-full">
        <Link href="/" className="md:text-[1.4vmax] flex items-center text-[1.3rem] cursor-pointer font-bold"> 
          <p className="text-bg-gradient"> NoPey </p> 
          <span className="ml-[10px] text-[#fff]">Pey</span> 
         </Link>

        <Links />
        {/* @ts-ignore */}
        <CgMenuOreos className="text-[20px] cursor-pointer md:hidden" />
    </nav>
  )
}

export default Nav