import { useState,  } from "react"
import {  useWriteContract, useSendTransaction, useWalletClient } from "wagmi";
import { allContracts } from '@/constants';
import toast from "react-hot-toast"
import { ethers } from "ethers"
import { usePeyPeyContext } from "@/components/PeyPeyContext";
import { pharos } from "@/chain-configs/customChain";
import { Vault } from "lucide-react";
import { sepolia } from "viem/chains";

export const useContractHooks = () => {
     const { fundsVault, mockUsdc, principalToken, yieldToken } = allContracts;
     const { setShowLoadingState, network } = usePeyPeyContext()
     const [hasDeposited, setHasDeposited] = useState(false)
     const [isApproved, setIsApproved] = useState(false)
     const [userInfos, setUserInfos] = useState({
          deposited: "0",
          yieldBalance: "0",
          principalBalance: "0"
      })
      
      // write actions
      const { writeContract: writeDeposit, data: depoData, status: depositStatus, reset: resetDeposit, error: depositError } = useWriteContract();
      const { writeContract: writeApproval, data: approveData, status: approvalStatus, reset: resetApproval, error: approvalError } = useWriteContract();
      const { writeContract: writeWD, data: wdData, status: wdStatus, reset: resetWd } = useWriteContract()
       const {writeContract: payMerchant, data: payData, status: payStatus, error: paymentError, reset: resetPayment} = useWriteContract();
       const { writeContract: writeSell, data: sellData, status: sellStatus, reset: resetSelling, error: sellingError } = useWriteContract()


        const handleAssetsDeposit = async (depositAmount: string, lockPeriod: number) => {
                  if(typeof network.userAddr == "undefined" || network.userAddr.length == 0) {
                      toast.error("please kindly connect your wallet before proceeding..", {
                         position: "top-right"
                      })
                      return;
                  }

                  console.log(`sepolia chainId`, network.chainId)
                  if(network.chainId != sepolia.id) {
                    toast.error("Wrong Network, Please kindly switch to the correct network..", {
                      position: "top-right"
                   })
                   return;
                  }

                // the first way to handle 2 transactions at once 
                  try {
                    setShowLoadingState(true)
                    writeApproval({
                        abi: mockUsdc.abi,
                        address: mockUsdc.address as `0x${string}`,
                        functionName: "approve",
                        args: [fundsVault.address, ethers.parseUnits(String(depositAmount), 6)],
                    })
                    setIsApproved(true)
                    // @ts-ignore
      
                  } catch(err) {
                       console.log(approvalError)
                       console.log(err)
                      toast.error("something went wrong", {
                         position: "top-right"
                      })
                      resetApproval()
                      return;
                  }
      
              }


        const handleTokenApproval = (depositAmount: number): void => {
                if(typeof network.userAddr == "undefined" || network.userAddr.length == 0) {
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

        /**
         * @dev withdraw function
         * @param userBalance - user balance
         * @param amount - amount to wd
         * @returns 
         */
          const handleAssetsWithdrawal = async(userBalance: string, amount: number) => {
                   if(typeof network.userAddr == "undefined" || network.userAddr.length == 0) {
                        toast.error("please kindly connect your wallet before proceeding..", {
                           position: "top-right"
                        })
                        return;
                    }

                    if(network.chainId != sepolia.id) {
                      toast.error("Wrong Network, Please kindly switch to the correct network..", {
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

                          setShowLoadingState(true)
                          writeWD({  
                             abi: fundsVault.abi,
                             address: fundsVault.address as `0x${string}`,
                             functionName: 'withdrawPrincipal',
                             args: [ethers.parseUnits(String(amount), 6)],
                             gas: BigInt("3000000"),
                          })

                          // const hash = await walletClient?.writeContract({
                          //   abi: fundsVault.abi,
                          //   address: fundsVault.address as `0x${string}`,
                          //   functionName: 'withdrawPrincipal',
                          //   args: [ethers.parseUnits(String(amount), 6)],
                          //   // gas: BigInt("3000000"),
                          // })
      
                          // sendTransaction({
                          //    to: fundsVault.address as `0x${string}`,
                          //    data: encodedData as `0x${string}`,
                          //    chainId: network?.chainId

                          // console.log(`wd tx hash ${hash}`)
                         
                    } catch (err) {
                        console.log(err)
                        toast.error("something went wrong, tx failed", {
                           position: "top-right"
                        })
                        resetWd()
                        return;
                    }
              }

               /**
         * 
         * @dev handling purchased item's payment 
         */
        const payPurchasedItem = async(requiredDepo: string) => {
             if(network.userAddr?.length! <= 0) {
                 toast.error("Please connect to a wallet to proceed!")
                 return
             }

             if(network.chainId != sepolia.id) {
              toast.error("Wrong Network, Please kindly switch to the correct network..", {
                position: "top-right"
             })
             return;
            }

           try {
              setShowLoadingState(true)
              payMerchant({
                abi: fundsVault.abi,
                address: fundsVault.address as `0x${string}` ,
                functionName: "payMerchant",
                args: [requiredDepo != "" && ethers.parseUnits(requiredDepo, 6) , "0x4417a09fd291D494F67aB787055C29E17DE49eDe"],
                // gas: BigInt("80000")
              })
           } catch (error) {
              console.log(error)
                toast.error("An error occurred while purchasing items. Please try again!", {
                        position: "top-right"
                  })
                resetPayment()
                return;
           }
        }

         /**
          * @dev function for selling tokens
          */
        const sellTokens = (amount: number, to: string) => {
          
          if(network.userAddr?.length! <= 0) {
            toast.error("Please connect to a wallet to proceed!")
            return
        }

          if(network.chainId != sepolia.id) {
            toast.error("Wrong Network, Please kindly switch to the correct network..", {
              position: "top-right"
           })
           return;
          }

              try {
                console.log("trading")
                if(amount && to) {
                  setShowLoadingState(true)
                  writeSell({
                      abi: fundsVault.abi,
                      address: fundsVault.address as `0x${string}`,
                      functionName: "sellYieldTokensForTokens",
                      args: [ethers.parseUnits(String(amount), 6), to],
                    //  gas: BigInt("52000"),
                  })
                }

              } catch(err) {
                console.log(err)
                resetSelling()
              }
          }


      return { 
        handleAssetsDeposit, writeDeposit, setHasDeposited, hasDeposited, depositStatus, depoData, resetDeposit, depositError,
        handleTokenApproval, approvalStatus, approveData, resetApproval, approvalError, isApproved, setIsApproved,
        handleAssetsWithdrawal, wdData, wdStatus, resetWd,
        userInfos, setUserInfos,
        payData, payStatus, paymentError, payPurchasedItem, resetPayment,
        sellTokens, sellData, sellStatus, resetSelling, sellingError
    };
}