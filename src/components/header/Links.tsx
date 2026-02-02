import React from 'react'
import { navbarLists } from '@/constants'
import Link from 'next/link'
import {  usePathname  } from 'next/navigation'
import { CustomConnectButton } from "@/components"

const Links = () => {
    const path = usePathname()

  return (
    <ul className="lg:flex items-center gap-[40px] hidden ">
            { navbarLists.map(list => (
                <Link
                className={`flex items-center gap-[10px] cursor-pointer ${(path.split('/')[1].length == 0 ? "home" : path.split('/')[1]) == list.title.toLowerCase() && "bg-[var(--bright-yellow)] text-(--dark)"} hover:bg-[var(--bright-yellow)] hover:text-(--dark) py-[6px] px-[10px] font-semibold rounded-[10px] transition-all duration-500`}
                  key={list.id} href={list.url || "/"}> 
                  <list.Icon className="w-[20px] h-[20px]" />
                  <li 
                    > { list.title }  
                  </li>
                </Link>
            )) }
            
          {/* <CustomConnectButton /> */}
        {/* <UserButton /> */}
    </ul>
  )
}

export default Links