import React from 'react'
import {Toaster} from "react-hot-toast"
import { usePeyPeyContext } from "../PeyPeyContext"
import { CircleDollarSign } from "lucide-react"

const WithdrawalModal = () => {
     const { openWithdrawModal, setOpenWithdrawModal } = usePeyPeyContext()

  return (
    <div
     className={`transition-all duration-500 ${!openWithdrawModal ? "hidden h-0 w-0" : "h-screen fixed left-0 flex top-0 w-full"} `}    
    >   
        <Toaster />
        <div 
          onClick={() => setOpenWithdrawModal(false)}
          className="absolute top-0 w-full h-full glass-modal" />

        <div className="w-[40%] mx-auto h-[50%] glass-card rounded-[10px]">

        </div>
    </div>
  )
}

export default WithdrawalModal