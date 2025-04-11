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
import { IState } from "@/types"
import { usePeyPeyContext } from '../PeyPeyContext'

interface IProps {
  selectedAsset: IState;
  setSelectedAsset: Dispatch<SetStateAction<IState>>
}

const InputTo = ({ selectedAsset, setSelectedAsset } : IProps) => {
   const selectRef = useRef<HTMLDivElement>(null)
   const { tokenToAmount } = usePeyPeyContext()
   const [amountTo, updateAmountTo] = useState("0")
    const [selectAsst, setSelectAsst] = useState({
          name: "",
          address: ""
    });
   const { mockUsdc, principalToken, yieldToken } = allContracts

   const handleSelectedAsset = (asset: string) => {
        const selectedAsst = asset.toLowerCase() == "usdc" ? mockUsdc.address : asset.toLowerCase() == "ytusdc" ? yieldToken.address : asset.toLowerCase() == "ptusdc" ? principalToken.address : ""
        
          setSelectAsst({ name: asset, address: selectedAsst })
   }

   useEffect(() => {
      const handlingUserSelection = () => {
        setSelectedAsset({ ...selectedAsset, 
          to: { name: selectAsst.name, address: selectAsst.address, amount: Number(amountTo)}
        })
      }
      handlingUserSelection()

      console.log(selectedAsset)
   }, [selectAsst, amountTo])


   const handlingUserInput = (e: ChangeEvent<HTMLInputElement>) => {
     console.log(e.target.value)
        updateAmountTo(e.target.value)
        console.log("assetSelected",selectedAsset)
       
   }


  return (
    <div className='flex w-full flex-col gap-[10px]'>
        <div className="w-full flex items-center justify-between">
           <h3> To </h3>
        </div>

        <div className="flex items-center gap-[10px]">
           <input
              value={tokenToAmount}
              onChange={(e) => handlingUserInput(e)}
              type="text" placeholder="0.00" className="w-[70%] glass-card p-[10px]" />
            <Select onValueChange={(val) => handleSelectedAsset(val)}>
                <SelectTrigger className='w-[30%] glass-card cursor-pointer'>
                   <SelectValue placeholder="Usdc" />
                </SelectTrigger>
                <SelectContent>
                    <SelectGroup className='glass-card cursor-pointer'>
                      <SelectLabel> Assets </SelectLabel>
                      <SelectItem  value='usdc'>USDC</SelectItem>
                      <SelectItem value='ptusdc'> ptUSDC </SelectItem>
                      <SelectItem value='ytusdc'> ytUSDC </SelectItem>
                    </SelectGroup>
                </SelectContent>
            </Select>
        </div>
    </div>
  )
}

export default InputTo