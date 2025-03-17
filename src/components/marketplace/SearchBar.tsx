import React from 'react'
import { Search, Filter, ShoppingBag } from 'lucide-react'

const SearchBar = () => {
  return (
    <div className="w-full mx-auto flex items-center gap-[20px]">
        <aside className='flex w-[75%] items-center gap-[15px] py-[5px] px-[10px] border-[1px] border-[#202021] bg-brown rounded-[15px]'>
            <Search className="w-[20px]" />
            <input type='text' className="bg-transparent border-none outline-none h-full w-[90%] " placeholder='Search Marketplace' /> 
        </aside>

        <aside className="flex items-center gap-[20px]">
            <div className="flex items-center gap-[10px] cursor-pointer bg-[rgba(9,9,11,255)] border-[1px] border-[#202021] rounded-[15px] py-[5px] px-[10px]">
               <Filter className="" />
               Filter
            </div>

            <div className="flex items-center gap-[10px] cursor-pointer bg-brown border-[1px] border-[#202021] rounded-[15px] py-[5px] px-[10px]">
               <ShoppingBag className="" />
               Your Orders
            </div>
        </aside>
    </div>
  )
}

export default SearchBar