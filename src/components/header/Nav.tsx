"use client"
import {Dispatch, SetStateAction, useState} from 'react'
import Link from 'next/link'
import { CgMenuOreos } from "react-icons/cg";
import Links from './Links'
import { CivicWallet } from "@/components"

type PProps = {
  updateShowNav: Dispatch<SetStateAction<boolean>>
}

const Nav = ({updateShowNav}: PProps) => {

  return (
    <nav className="flex items-center justify-between xl:w-[80%] lg:w-[90%] w-[90%] mx-auto h-full">
        <Link href="/" className="text-[clamp(2.5rem,4.5vw,2.7rem)] flex items-center cursor-pointer text-[var(--dark)] font-extrabold"> 
           OraPay
         </Link>

        <Links />
        <CivicWallet />
        {/* @ts-ignore */}
        <CgMenuOreos onClick={() => updateShowNav(true)} className="text-[20px] cursor-pointer lg:hidden" />
    </nav>
  )
}

export default Nav