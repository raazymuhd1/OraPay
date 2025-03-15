import React from 'react'
import { navbarLists } from '@/constants'
import { CustomButton } from "@/components"
import Link from 'next/link'
import { LuWallet } from "react-icons/lu";

const Links = () => {
  return (
    <ul className="md:flex items-center gap-[40px] hidden ">
            { navbarLists.map(list => (
                <Link
                  className="cursor-pointer "
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