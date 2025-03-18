"use client"
import { useState, use, createContext, ReactNode } from 'react'
interface IProps {
  children: ReactNode
}

interface IModalState {
  openDepositModal: boolean,
  setDepositModal: React.Dispatch<React.SetStateAction<boolean>>
  openCalculatorModal: boolean,
  setCalculatorModal: React.Dispatch<React.SetStateAction<boolean>>;
  openPayModal: boolean;
  setOpenPayModal: React.Dispatch<React.SetStateAction<boolean>>;
}

// @ts-ignore
const PeyPeyContext = createContext<IModalState>(null);


const PeyPeyContextProvider = ({ children }: IProps) => {
      const [openDepositModal, setDepositModal] = useState<boolean>(false)
      const [openCalculatorModal, setCalculatorModal] = useState<boolean>(false)
      const [openPayModal, setOpenPayModal] = useState<boolean>(false)

  return (
    <PeyPeyContext.Provider
      value={{
         openDepositModal, setDepositModal,
        openCalculatorModal, setCalculatorModal,
        openPayModal, setOpenPayModal
      }}
    >
      { children }
    </PeyPeyContext.Provider>
  )
}

export default PeyPeyContextProvider


export const usePeyPeyContext = () => use(PeyPeyContext);