import React from 'react'
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

const InputFrom = () => {
  return (
    <div className='flex w-full flex-col gap-[10px]'>
        <div className="w-full flex items-center justify-between">
           <h3> From </h3>
           <aside className="flex items-center gap-[10px]">
              <p className="text-[#7f7f80]"> Balance: 2,300 </p>
              <strong> Max </strong>
           </aside>
        </div>

        <div className="flex items-center gap-[10px]">
           <input type="text" placeholder="0.00" className="w-[70%] glass-card p-[10px]" />
            <Select>
                <SelectTrigger className='w-[30%] glass-card cursor-pointer'>
                   <SelectValue placeholder="Usdc" />
                </SelectTrigger>
                <SelectContent>
                    <SelectGroup className='glass-card cursor-pointer'>
                      <SelectLabel> Assets </SelectLabel>
                      <SelectItem value='usdc'>USDC</SelectItem>
                      <SelectItem value='dai'> DAI </SelectItem>
                      <SelectItem value='pt-usdc'> ptUSDC </SelectItem>
                      <SelectItem value='pt-usdc'> ptDAI </SelectItem>
                      <SelectItem value='yt-usdc'> ytUSDC </SelectItem>
                      <SelectItem value='yt-dai'> ytDAI </SelectItem>
                    </SelectGroup>
                </SelectContent>
            </Select>
        </div>
    </div>
  )
}

export default InputFrom