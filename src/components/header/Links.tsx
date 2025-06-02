import React from 'react'
import { navbarLists } from '@/constants'
import Link from 'next/link'
import { useAccount, useBalance } from 'wagmi'
import {  usePathname  } from 'next/navigation'
import { CustomConnectButton } from "@/components"
import { UserButton } from "@civic/auth-web3/react"


const Links = () => {
    const path = usePathname()
    const user = useAccount()
    const userBal = useBalance()
    
    console.log(`user ${user.address}`)
    console.log(`user Bal ${userBal.data?.value}`)

  return (
    <ul className="lg:flex items-center gap-[40px] hidden ">
            { navbarLists.map(list => (
                <Link
                  className={`cursor-pointer ${(path.split('/')[1].length == 0 ? "home" : path.split('/')[1]) == list.title.toLowerCase() && "border-b-[2px] border-[#2caec5]"} hover:bg-[#2caec5] py-[6px] px-[10px] font-semibold rounded-[10px] transition-all duration-500`}
                  key={list.id} href={list.url || "/"}> 
                  { list.title } 
                </Link>
            )) }
            
          {/* <CustomConnectButton /> */}
        <UserButton />
    </ul>
  )
}

export default Links