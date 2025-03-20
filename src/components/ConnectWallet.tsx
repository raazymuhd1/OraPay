"use client"
import {useState} from 'react'
import { ConnectKitButton } from 'connectkit'
import { CustomButton } from "@/components"
import { LuWallet } from "react-icons/lu";

const ConnectWallet = () => {
    const [walletConnect, setWalletConnect] = useState(true)
    const [connectionStatus, setConnectionStatus] = useState({
        isConnected: false
    })    

    console.log(connectionStatus.isConnected)

  return (
    <div className={`transition-all duration-500 ${!walletConnect ? "hidden h-0 w-0" : "h-screen fixed left-0 flex top-0 w-full"} `} >
     
     <div 
          onClick={() => connectionStatus.isConnected ? setWalletConnect(false) : setWalletConnect(true) }
          className="absolute top-0 w-full h-full glass-card" /> 

    {/* <div 
    onClick={() => connectionStatus.isConnected && setWalletConnect(false)}
    className="w-full h-full flex flex-col justify-center items-center  absolute top-0" >  */}
        <ConnectKitButton.Custom >
            { ({ isConnected, isConnecting, show, hide, address, ensName, chain }) => {
                // setConnectionStatus({ isConnected })
                return <CustomButton
                        onClick={() => {
                            if(show) show()
                            if(isConnected) setConnectionStatus({
                                isConnected: true
                            })
                        }}
                        disabled={false}
                        style={`bg-gradient absolute top-[100px] w-[fit-content] h-[40px]`}
                        >
                        <LuWallet size={20}/>
                        { isConnecting ? "Connecting" : isConnected ? `${address?.slice(0, 5)}...${address?.slice(35, address?.length-1)}` : "Connect Wallet"}
                    </CustomButton>
            } }
        </ConnectKitButton.Custom>
    </div>
    // </div>
  )
}

export default ConnectWallet