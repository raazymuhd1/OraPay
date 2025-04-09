import React, { SetStateAction, useEffect, Dispatch, useRef, useState, useCallback, ChangeEvent, memo } from 'react'
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { allContracts } from '@/constants'
import { useBalance, useAccount, useChainId } from "wagmi"
import { IState } from "@/types"
interface IProps {
  selectedAsset: IState;
  setSelectedAsset: Dispatch<SetStateAction<IState>>
}

const InputFrom = ({ selectedAsset, setSelectedAsset } : IProps) => {
   const selectRef = useRef<HTMLDivElement>(null)
   const [amountFrom, updateAmountFrom] = useState("0")
   const { address: userAddr } = useAccount()
   const chainId = useChainId()
   const { mockUsdc, principalToken, yieldToken } = allContracts
   const [selectAsst, setSelectAsst] = useState({
       name: "",
       address: ""
   });
    const tokenBal = useBalance({
              token: selectAsst.address as `0x${string}`,
              address: userAddr,
              chainId
      })

   useEffect(() => {
      const handlingUserSelection = () => {
        setSelectedAsset({ ...selectedAsset, 
          from: { name: selectAsst.name, address: selectAsst.address, amount: Number(amountFrom)}
        })

        console.log("balance", tokenBal.data)
        console.log("asset", selectedAsset)
      }
      handlingUserSelection()
   }, [selectAsst, amountFrom])

   
  function handleSelectedAsset(asset: string) {
        const selectedAsst = asset.toLowerCase() == "usdc" ? mockUsdc.address : asset.toLowerCase() == "ytusdc" ? yieldToken.address : asset.toLowerCase() == "ptusdc" ? principalToken.address : ""
        console.log("selected", selectedAsset);
        setSelectAsst({ name: asset, address: selectedAsst })
   }

   const handlingUserInput = (e: ChangeEvent<HTMLInputElement>) => {
     console.log(e.target.value)
        updateAmountFrom(e.target.value)
       
   }


  return (
    <div className='flex w-full flex-col gap-[10px]'>
        <div className="w-full flex items-center justify-between">
           <h3> From </h3>
           <aside className="flex items-center gap-[10px]">
              <p className="text-[#7f7f80]"> Balance: { tokenBal?.data?.formatted || 0 } </p>
              <strong> Max </strong>
           </aside>
        </div>

        <div className="flex items-center gap-[10px]">
           <input
              value={amountFrom}
              onChange={(e) => handlingUserInput(e)}
              type="text" placeholder="0.00" className="w-[70%] glass-card p-[10px]" />
            <Select onValueChange={(val) => handleSelectedAsset(val)} >
                <SelectTrigger className='w-[30%] glass-card cursor-pointer'>
                   <SelectValue placeholder="Usdc" />
                </SelectTrigger>
                <SelectContent>
                    <SelectGroup className='glass-card cursor-pointer'>
                      <SelectLabel> Assets </SelectLabel>
                      <SelectItem 
                        value="usdc"
                        >
                          USDC
                        </SelectItem>
                      <SelectItem onClick={() => handleSelectedAsset("ptusdc")} value='ptusdc'> ptUSDC </SelectItem>
                      <SelectItem onClick={() => handleSelectedAsset("ytusdc")} value='ytusdc'> ytUSDC </SelectItem>
                    </SelectGroup>
                </SelectContent>
            </Select>
        </div>
    </div>
  )
}

export default InputFrom