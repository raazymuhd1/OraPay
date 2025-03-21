import React from 'react'
import { navbarLists } from '@/constants'
import { CustomButton } from "@/components"
import Link from 'next/link'
import { ConnectKitButton } from 'connectkit'
import { useAccount } from 'wagmi'
import { LuWallet } from "react-icons/lu";
import {  usePathname  } from 'next/navigation'

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
            <ConnectKitButton.Custom >
               { ({ isConnected, isConnecting, show, hide, address, ensName, chain }) => {
                   return  <CustomButton
                            onClick={show}
                            disabled={false}
                            style={`bg-gradient min-w-[fit-content]`}
                          >
                            <LuWallet size={20}/>
                            { isConnecting ? "Connecting" : isConnected ? `${address?.slice(0, 5)}...${address?.slice(35, address?.length-1)}` : "Connect Wallet"}
                        </CustomButton>
               } }
            </ConnectKitButton.Custom>
    </ul>
  )
}

export default Links