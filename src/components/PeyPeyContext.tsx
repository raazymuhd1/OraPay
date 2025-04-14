"use client"
import { useState, use, createContext, ReactNode } from 'react'
import { IModalState } from "@/types"
import { useAccount, useChainId } from 'wagmi'

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

  return (
    <PeyPeyContext.Provider
      value={{
         openDepositModal, setDepositModal,
        openCalculatorModal, setCalculatorModal,
        openPayModal, setOpenPayModal,
        openWithdrawModal, setOpenWithdrawModal,
        selectedProduct, setSelectedProduct,
        setTokenToAmount, tokenToAmount,
        showTxResult, setShowTxResult,
        network,
        showTxsRecord, setShowTxsRecord
      }}
    >
      { children }
    </PeyPeyContext.Provider>
  )
}

export default PeyPeyContextProvider
// a custom hook for exporting the context
export const usePeyPeyContext = () => use(PeyPeyContext);