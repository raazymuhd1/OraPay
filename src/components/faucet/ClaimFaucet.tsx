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
        // const iFace = new ethers.Interface([
        //     "function getFaucet(address)"
        // ])
        // const encodedFunction = iFace.encodeFunctionData("getFaucet", userAddr as any)

        // const estimatingGas = await estimateGas(wagmiConfig, {
        //     account: userAddr,
        //     data: encodedFunction as `0x${string}`,
        //     to: mockUsdc.address as `0x${string}`,
        // })

        // console.log("encoded function", encodedFunction)

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
    <div className="w-[40%] min-h-[200px] glass-card rounded-[15px] translate-y-[200px] p-[20px] mx-auto flex flex-col items-center justify-center gap-[20px]">

       <div className="flex w-full mx-auto flex-col gap-[10px] items-center">
         <h2 className="text-[clamp(20px,2vw,30px)] font-bold"> Faucet </h2>
         <p className="text-[clamp(16px,2vw,18px)] text-center  font-semibold text-[#7f7f80]"> Claim USDC faucet by placing your wallet address </p>
       </div>

        <div className='flex w-[90%] mx-auto flex-col gap-[20px]'>
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
                style={`bg-gradient w-full`}
                        >
                <CreditCard className="" />
                { faucetStatus == "pending" ? "Claiming..." : "Claim Faucet" }
            </CustomButton>  
        </div>
    </div>
  )
}

export default ClaimFaucet