"use client"
import {Dispatch, SetStateAction, useState} from 'react'
import Link from 'next/link'
import { CgMenuOreos } from "react-icons/cg";
import Links from './Links'
import MobileLinks from './MobileLinks';

type PProps = {
  updateShowNav: Dispatch<SetStateAction<boolean>>
}

const Nav = ({updateShowNav}: PProps) => {

  return (
    <nav className="flex items-center justify-between lg:w-[70%] w-[90%] mx-auto h-full">
        <Link href="/" className="lg:text-[1.5vmax] md:text-[2vmax] flex items-center text-[1.5rem] cursor-pointer font-bold"> 
          <p className="text-bg-gradient"> NoPey </p> 
          <span className="text-[#fff]">Pey</span> 
         </Link>

        <Links />
        {/* @ts-ignore */}
        <CgMenuOreos onClick={() => updateShowNav(true)} className="text-[20px] cursor-pointer md:hidden" />
    </nav>
  )
}

export default Nav