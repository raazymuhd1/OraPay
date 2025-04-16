"use client"
import { useState, use, createContext, ReactNode } from 'react'
import { IModalState } from "@/types"
import { useAccount, useChainId, useReadContract } from 'wagmi'
import { allContracts } from "@/constants"

interface IProps {
  children: ReactNode
}

// @ts-ignore
const PeyPeyContext = createContext<IModalState>(null);

const PeyPeyContextProvider = ({ children }: IProps) => {
      const [openDepositModal, setDepositModal] = useState<boolean>(false)
      const [openCalculatorModal, setCalculatorModal] = useState<boolean>(false)
      const [openPayModal, setOpenPayModal] = useState<boolean>(false)
      const [openWithdrawModal, setOpenWithdrawModal] = useState<boolean>(false);
      const [showTxsRecord, setShowTxsRecord] = useState(false)
      const [showLoadingState, setShowLoadingState] = useState(false)
      const [selectedProduct, setSelectedProduct] = useState({
         id: 0,
         title: "",
         desc: "", 
         price: "",
         tag: ""
      });
      const [showTxResult, setShowTxResult] = useState(false)
      const [tokenToAmount, setTokenToAmount] = useState(0)
      const { address: userAddr } = useAccount();
      const chainId = useChainId()
      const network = { chainId: chainId!, userAddr: userAddr! }
      const { fundsVault } = allContracts;

         const { data: holdingsResult, isLoading: holdingLoading, status: holdingStatus } = useReadContract({
                abi: fundsVault.abi,
                address: fundsVault.address as `0x${string}`,
                functionName: 'getHoldings',
                args: [userAddr]
            })
      
            const { data: userDeposits, isLoading: userDepositLoading, status: userDepositStatus } = useReadContract({
                abi: fundsVault.abi,
                address: fundsVault.address as `0x${string}`,
                functionName: 'getUserDeposits',
                args: [userAddr]
            })

  return (
    <PeyPeyContext.Provider
      value={{
        // @ts-ignore
          holdingsResult, 
          // @ts-ignore
          userDeposits!, 
          holdingLoading, userDepositLoading, userDepositStatus, holdingStatus,
          openDepositModal, setDepositModal,
          openCalculatorModal, setCalculatorModal,
          openPayModal, setOpenPayModal,
          openWithdrawModal, setOpenWithdrawModal,
          selectedProduct, setSelectedProduct,
          setTokenToAmount, tokenToAmount,
          showTxResult, setShowTxResult,
          network,
          showTxsRecord, setShowTxsRecord,
          showLoadingState, setShowLoadingState
      }}
    >
      { children }
    </PeyPeyContext.Provider>
  )
}

export default PeyPeyContextProvider
// a custom hook for exporting the context
export const usePeyPeyContext = () => use(PeyPeyContext);