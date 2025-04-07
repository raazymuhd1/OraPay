import { useReadContract, useAccount, useBalance, useWriteContract, useChainId } from "wagmi";
import { allContracts } from '@/constants';
import toast from "react-hot-toast"
import { ethers } from "ethers"


export const useContractHooks = () => {
     const { fundsVault, mockUsdc, principalToken, yieldToken } = allContracts;
     const { address: userAddr } = useAccount()
     const chainId = useChainId()

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

        const handleAssetsDeposit = (depositAmount: number) => {
                  if(typeof userAddr == "undefined" || userAddr.length == 0) {
                      toast.error("please kindly connect your wallet before proceeding..", {
                         position: "top-right"
                      })
                      return;
                  }
      
                  try {
                    const lockPeriod = 10 * 86400; // 10 days
                    const args = [depositAmount * 10**6, 0]
      
                     writeDeposit({
                        abi: fundsVault.abi,
                        address: fundsVault.address as `0x${string}`,
                        functionName: "deposit",
                        args,
                        gas: BigInt("25000")
                    })
                    
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

            
          const handleAssetsWithdrawal = (userBalance: string, amount: number) => {
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
                          writeWD({
                             abi: fundsVault.abi,
                             address: fundsVault.address as `0x${string}`,
                             functionName: 'withdrawPrincipal',
                             args: [ethers.parseUnits(String(amount), 6)]
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
        handleAssetsDeposit, depositStatus, depoData, resetDeposit, depositError,
        handleTokenApproval, approvalStatus, approveData, resetApproval, approvalError,
        handleAssetsWithdrawal, wdData, wdStatus, resetWd, getContract, setFundsVault
    };
}