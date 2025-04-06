import { useReadContract, useAccount, useBalance, useWriteContract, useChainId } from "wagmi";
import { allContracts } from '@/constants';
import toast from "react-hot-toast"

interface IUserBal {
    data: {
        value: BigInt;
        symbol: string;
        decimals: number;
        formattedValue: string;
    }
}

export const useContractHooks = () => {
     const { fundsVault, mockUsdc, principalToken, yieldToken } = allContracts;
     const { address: userAddr } = useAccount()
     const chainId = useChainId()
      const { writeContract: writeDeposit, data: depoData, status: depositStatus } = useWriteContract();
      const { writeContract: writeApproval, data: approveData, status: approvalStatus, reset: resetApproval } = useWriteContract();
      const { writeContract: writeWD, data: wdData, status: wdStatus } = useWriteContract()

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
                        gas: BigInt("3000000")
                    })
                    
                  } catch(err) {
                       console.log(err)
                      toast.error(err as string, {
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
                        toast.error(err as string, {
                            position: "top-right"
                        })
                        return;
                    }
                }

            
          const handleAssetsWithdrawal = (userBalance: string) => {
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
                            args: []
                          })
        
                    } catch (err) {
                        console.log(err)
                        toast.error(err as string, {
                           position: "top-right"
                        })
                        return;
                    }
              }

      return { 
        holdingsResult, userDeposits, holdingLoading, userDepositLoading, userDepositStatus, holdingStatus,
        handleAssetsDeposit, depositStatus, depoData,
        handleTokenApproval, approvalStatus, approveData, resetApproval,
        handleAssetsWithdrawal, wdData, wdStatus
    };
}