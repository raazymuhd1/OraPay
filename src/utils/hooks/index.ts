import { useReadContract, useAccount } from "wagmi";
import { allContracts } from '@/constants';

export const useContractHooks = () => {
     const { fundsVault } = allContracts;
     const { address: userAddr } = useAccount()

       const { data: holdingsResult, isLoading: holdingLoading } = useReadContract({
          abi: fundsVault.abi,
          address: fundsVault.address as `0x${string}`,
          functionName: 'getHoldings',
          args: [userAddr]
      })

      const { data: userDeposits, isLoading: userDepositLoading } = useReadContract({
          abi: fundsVault.abi,
          address: fundsVault.address as `0x${string}`,
          functionName: 'userDeposits',
          args: [userAddr]
      })


      return { 
        holdingsResult, userDeposits, holdingLoading, userDepositLoading
    };
}