import React from 'react'
import { navbarLists } from '@/constants'
import { CustomButton } from "@/components"
import Link from 'next/link'
import { LuWallet } from "react-icons/lu";
import { useSelectedLayoutSegment, usePathname  } from 'next/navigation'

const Links = () => {
    const segment = useSelectedLayoutSegment();
    const path = usePathname()

    console.log(path.split('/')[1])

  return (
    <ul className="md:flex items-center gap-[40px] hidden ">
            { navbarLists.map(list => (
                <Link
                  className={`cursor-pointer ${(path.split('/')[1].length == 0 ? "home" : path.split('/')[1]) == list.title.toLowerCase() && "border-b-[2px] border-[#2caec5]"}`}
                  key={list.id} href={list.url}> 
                  { list.title } 
                </Link>
            )) }
            <CustomButton
                onClick={() => {}}
                disabled={false}
                style={`bg-gradient`}
              >
                <LuWallet size={20}/>
                Connect Wallet
            </CustomButton>
    </ul>
  )
}

export default Links