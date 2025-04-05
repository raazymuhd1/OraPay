import { useReadContract, useAccount } from "wagmi";
import { allContracts } from '@/constants';

export const useContractHooks = () => {
     const { fundsVault } = allContracts;
     const { address: userAddr } = useAccount()

       const holdingsResult = useReadContract({
          abi: fundsVault.abi,
          address: fundsVault.address as `0x${string}`,
          functionName: 'getHoldings',
          args: [userAddr]
      })

      const userDeposits = useReadContract({
          abi: fundsVault.abi,
          address: fundsVault.address as `0x${string}`,
          functionName: 'userDeposits',
          args: [userAddr]
      })


      return { 
        holdingsResult, userDeposits 
    };
}