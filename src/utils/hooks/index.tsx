import { useState } from "react"
import { useReadContract, useAccount, useWaitForTransactionReceipt, useSimulateContract, useWriteContract, useChainId } from "wagmi";
import { simulateContract } from '@wagmi/core'
import { allContracts } from '@/constants';
import toast from "react-hot-toast"
import { ethers } from "ethers"
import { wagmiConfig } from "@/components/Web3Provider";

export const useContractHooks = () => {
     const { fundsVault, mockUsdc, principalToken, yieldToken } = allContracts;
     const { address: userAddr } = useAccount()
     const chainId = useChainId()
     const [hasDeposited, setHasDeposited] = useState(false)
     const [isApproved, setIsApproved] = useState(false)

      const { writeContract: writeDeposit, data: depoData, status: depositStatus, reset: resetDeposit, error: depositError } = useWriteContract();
      const { writeContract: writeApproval, data: approveData, status: approvalStatus, reset: resetApproval, error: approvalError } = useWriteContract();
      const { writeContract: writeWD, data: wdData, status: wdStatus, reset: resetWd } = useWriteContract()
      const { writeContract: writeFundsVault } = useWriteContract();

       const { data: holdingsResult, isLoading: holdingLoading, status: holdingStatus } = useReadContract({
          abi: fundsVault.abi,
          address: fundsVault.address as `0x${string}`,
          functionName: 'getHoldings',
          args: [userAddr]
      })

      const { data: userDeposits, isLoading: userDepositLoading, status: userDepositStatus } = useReadContract({
          abi: fundsVault.abi,
          address: fundsVault.address as `0x${string}`,
          functionName: 'userDeposits',
          args: [userAddr]
      })

        const handleAssetsDeposit = (depositAmount: string, lockPeriod: number) => {
                  if(typeof userAddr == "undefined" || userAddr.length == 0) {
                      toast.error("please kindly connect your wallet before proceeding..", {
                         position: "top-right"
                      })
                      return;
                  }
                // the first way to handle 2 transactions at once 
                  try {
                    writeApproval({
                        abi: mockUsdc.abi,
                        address: mockUsdc.address as `0x${string}`,
                        functionName: "approve",
                        args: [fundsVault.address, ethers.parseUnits(String(depositAmount), 6)],
                        // gas: BigInt("250000")
                    })
                    
                    // writeDeposit({
                    //     abi: fundsVault.abi,
                    //     address: fundsVault.address as `0x${string}`,
                    //     functionName: "deposit",
                    //     args: [depositAmount ? ethers.parseUnits(depositAmount, 6) : 0, lockPeriod],
                    //     gas: BigInt("250000")
                    // });
      
                  } catch(err) {
                       console.log(err)
                      toast.error("something went wrong", {
                         position: "top-right"
                      })
                      return;
                  }
      
              }


        const handleTokenApproval = (depositAmount: number): void => {
                if(typeof userAddr == "undefined" || userAddr.length == 0) {
                        toast.error("please kindly connect your wallet before proceeding..", {
                            position: "top-right"
                        })
                        return;
                    }
                    try {
                    writeApproval({
                        abi: mockUsdc.abi,
                        address: mockUsdc.address as `0x${string}`,
                        functionName: "approve",
                        args: [fundsVault.address, depositAmount * 10**6],
                    })
                    } catch(err) {
                        console.log(err)
                        toast.error("something went wrong", {
                            position: "top-right"
                        })
                        return;
                    }
                }

            
          const handleAssetsWithdrawal = async(userBalance: string, amount: number) => {
                   if(typeof userAddr == "undefined" || userAddr.length == 0) {
                        toast.error("please kindly connect your wallet before proceeding..", {
                           position: "top-right"
                        })
                        return;
                    }
        
                    if(userBalance === "0") {
                        toast.error("Insufficient funds to withdraw!", {
                           position: "top-right"
                        })
                        return;
                    }
        
                    try {
                        //   const simulateTx = await simulateContract(wagmiConfig, {
                        //      abi: fundsVault.abi,
                        //      address: fundsVault.address as `0x${string}`,
                        //      functionName: 'withdrawPrincipal',
                        //      args: [ethers.parseUnits(String(amount), 6)],
                        //      account: userAddr
                        //   })

                        // console.log(simulateTx.result)
                          writeWD({  
                             abi: fundsVault.abi,
                             address: fundsVault.address as `0x${string}`,
                             functionName: 'withdrawPrincipal',
                             args: [ethers.parseUnits(String(amount), 6)],
                            //  gas: BigInt("120000"),
                             account: userAddr
                          })
        
                    } catch (err) {
                        console.log(err)
                        toast.error("something went wrong, tx failed", {
                           position: "top-right"
                        })
                        return;
                    }
              }


        const getContract = async() => {
                const provider = new ethers.BrowserProvider(window?.ethereum)
                const signer = await provider.getSigner()
            const contract = new ethers.Contract(fundsVault.address, fundsVault.abi, signer); 
            const holdings =  await contract.getHoldings()
            console.log("holdings", holdings)
        }

        const setFundsVault = () => {
            try {
                writeFundsVault({
                    abi: principalToken.abi,
                    address: principalToken.address as `0x${string}`,
                    functionName: "setFundsVault",
                    args: [fundsVault.address]
                })

                writeFundsVault({
                    abi: yieldToken.abi,
                    address: yieldToken.address as `0x${string}`,
                    functionName: "setFundsVault",
                    args: [fundsVault.address]
                })
            } catch (error) {
                console.log(error)
            }
        }

      return { 
        holdingsResult, userDeposits, holdingLoading, userDepositLoading, userDepositStatus, holdingStatus,
        handleAssetsDeposit, writeDeposit, setHasDeposited, hasDeposited, depositStatus, depoData, resetDeposit, depositError,
        handleTokenApproval, approvalStatus, approveData, resetApproval, approvalError, setIsApproved,
        handleAssetsWithdrawal, wdData, wdStatus, resetWd, getContract, setFundsVault
    };
}