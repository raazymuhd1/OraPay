"use client"
import { useEffect, useState } from 'react'
import { useWriteContract, useAccount, useEstimateGas } from 'wagmi'
import { estimateGas } from "@wagmi/core"
import { ethers } from 'ethers'
import { allContracts } from '@/constants'
import toast, { Toaster } from 'react-hot-toast'
import { wagmiConfig } from '../Web3Provider'
import { CustomButton } from "@/components"
import { CreditCard } from 'lucide-react'
import Instructions from './Instructions'
import FaucetNetwork from './FaucetNetwork'

const ClaimFaucet = () => {
     const { writeContract: claimFaucet, data: faucetData, status: faucetStatus, reset: resetFaucet } = useWriteContract()
     const { address: userAddr } = useAccount()
     const { mockUsdc, fundsVault } = allContracts
     const [faucetReceiver, setFaucetReceiver] = useState("")

    useEffect(() => {
        console.log(faucetData)

        if(faucetStatus == "success" || faucetData) {
            toast.success("faucet claimed", {
                position: "top-right"
            })
            resetFaucet()
        } else if(faucetStatus == "error") {
            toast.error("something went wrong, claim faucet failed", {
                position: "top-right"
            })
        }
    }, [faucetStatus, faucetData])

    async function claimingFaucet() {
        try {
            claimFaucet({
                abi: fundsVault.abi,
                address: fundsVault.address as `0x${string}`,
                functionName: "getFaucet",
                args: [faucetReceiver || userAddr],
            })
        } catch (error) {
            console.log(error)
        }
    }

  return (
    <div className="lg:w-[30%] md:w-[50%] w-[90%] h-max rounded-[3rem] translate-y-[60px] p-[20px] mx-auto flex flex-col items-center glass-card gap-[20px] drop-shadow-[0,0,10px,#fff] ">

        <div className='flex w-full items-center  flex-col gap-[10px]'>
            <h2 className='font-extrabold text-[clamp(20px,1vw,30px)]'> Testnet Faucet </h2>
            <p className='text-[var(--paraph-color)] text-center text-[clamp(14px,1vw,16px)] '> Claim free testnet tokens for development and testing </p>
        </div>

        <Instructions />
        <FaucetNetwork />

        <div className='flex w-full mx-auto flex-col gap-[20px] p-[20px] glass-card'>
            <input 
                value={faucetReceiver}
                onChange={(e) => {
                    setFaucetReceiver(e.target.value)
                }}
                type="text" 
                className='px-[15px] py-[8px] w-full border-[1px] placeholder:text-center text-center rounded-[15px]' placeholder='place your address here' />
            <CustomButton
                onClick={async() => await claimingFaucet()}
                disabled={faucetReceiver.length <= 0 || faucetStatus == "pending" ? true : false}
                style={`bg-(--bright-yellow) w-full`}
                        >
                <CreditCard className="" />
                { faucetStatus == "pending" ? "Claiming..." : "Claim Faucet" }
            </CustomButton>  
        </div>
    </div>
  )
}

export default ClaimFaucet