import React, { SetStateAction, Dispatch } from 'react'
import { ConnectKitButton } from 'connectkit'
import {  usePathname  } from 'next/navigation'
import { navbarLists } from '@/constants'
import Link from 'next/link'
import { LuWallet } from "react-icons/lu";
import { CustomButton } from "@/components"
import { X } from 'lucide-react'

interface IProps {
   showNav: boolean;
   updateShowNav: Dispatch<SetStateAction<boolean>>
}

const MobileLinks = ({showNav, updateShowNav}: IProps) => {
     const path = usePathname()

     console.log("showing mobile nav", showNav)

  return (
    <ul className={`flex flex-col fixed top-[100px] right-0 h-[400px] bg-[red] z-[22] w-full gap-[40px] ${showNav ? "opacity-1 translate-x-[0]" : "hidden opacity-0 translate-x-[-100px]"}`}>
                { navbarLists.map(list => (
                    <Link
                      className={`cursor-pointer ${(path.split('/')[1].length == 0 ? "home" : path.split('/')[1]) == list.title.toLowerCase() && "border-b-[2px] border-[#2caec5]"}`}
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
                                { isConnected ? `${address?.slice(0, 5)}...${address?.slice(35, address?.length-1)}` : "Connect Wallet"}
                            </CustomButton>
                   } }
                </ConnectKitButton.Custom>
        </ul>
  )
}

export default MobileLinks