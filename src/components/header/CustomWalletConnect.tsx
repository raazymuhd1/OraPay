import React from 'react'
import { LuWallet } from "react-icons/lu";
import { ConnectKitButton } from 'connectkit'
import { CustomButton } from "@/components"

const CustomWalletConnect = () => {
  return (
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
  )
}

export default CustomWalletConnect