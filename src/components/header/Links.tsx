import React from 'react'
import { navbarLists } from '@/constants'
import { CustomButton } from "@/components"
import Link from 'next/link'
import { ConnectKitButton } from 'connectkit'
import { useAccount } from 'wagmi'
import { LuWallet } from "react-icons/lu";
import {  usePathname  } from 'next/navigation'
import CustomWalletConnect from "./CustomWalletConnect"

const Links = () => {
    const path = usePathname()

    console.log(path.split('/')[1])

  return (
    <ul className="md:flex items-center gap-[40px] hidden ">
            { navbarLists.map(list => (
                <Link
                  className={`cursor-pointer ${(path.split('/')[1].length == 0 ? "home" : path.split('/')[1]) == list.title.toLowerCase() && "border-b-[2px] border-[#2caec5]"} hover:bg-[#2caec5] py-[6px] px-[10px] rounded-[10px] transition-all duration-500`}
                  key={list.id} href={list.url || "/"}> 
                  { list.title } 
                </Link>
            )) }
            
          <CustomWalletConnect />
    </ul>
  )
}

export default Links