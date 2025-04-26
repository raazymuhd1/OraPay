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
    <nav className="flex items-center justify-between xl:w-[70%] lg:w-[90%] w-[90%] mx-auto h-full">
        <Link href="/" className="text-[clamp(2rem,4.5vw,2.7rem) flex items-center cursor-pointer font-extrabold"> 
          <p className="text-bg-gradient"> Edu </p> 
          <span className="text-[#fff]">Zero</span> 
         </Link>

        <Links />
        {/* @ts-ignore */}
        <CgMenuOreos onClick={() => updateShowNav(true)} className="text-[20px] cursor-pointer md:hidden" />
    </nav>
  )
}

export default Nav