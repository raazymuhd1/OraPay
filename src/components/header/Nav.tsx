"use client"
import React from 'react'
import Link from 'next/link'
import Links from './Links'
import { CgMenuOreos } from "react-icons/cg";

const Nav = () => {
  return (
    <nav className="flex items-center md:justify-around justify-between w-[90%] md:w-[100%] mx-auto h-full">
        <Link href="/" className="md:text-[1.4vmax] text-[1.3rem] cursor-pointer font-bold"> NoPey<span className="ml-[10px]">Pey</span> </Link>

        <Links />
        <CgMenuOreos />
    </nav>
  )
}

export default Nav