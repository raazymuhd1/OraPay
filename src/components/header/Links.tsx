import React from 'react'
import { navbarLists } from '@/constants'
import Link from 'next/link'
import { useAccount } from 'wagmi'
import {  usePathname  } from 'next/navigation'
import { CustomConnectButton } from "@/components"

const Links = () => {
    const path = usePathname()

    console.log(path.split('/')[1])

  return (
    <ul className="md:flex items-center gap-[40px] hidden ">
            { navbarLists.map(list => (
                <Link
                  className={`cursor-pointer ${(path.split('/')[1].length == 0 ? "home" : path.split('/')[1]) == list.title.toLowerCase() && "border-b-[2px] border-[#2caec5]"} hover:bg-[#2caec5] py-[6px] px-[10px] font-semibold rounded-[10px] transition-all duration-500`}
                  key={list.id} href={list.url || "/"}> 
                  { list.title } 
                </Link>
            )) }
            
          <CustomConnectButton />
    </ul>
  )
}

export default Links