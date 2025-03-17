import React from 'react'
import SearchBar from './SearchBar'

const Marketplace = () => {
  return (
    <div className="flex flex-col gap-[30px]">
       <div className="flex w-full flex-col gap-[20px] items-center mt-[40px]">
         <h2 className="text-[2.5vmax] font-bold"> Marketplace </h2>
         <p className="text-[1vmax] font-semibold text-[#7f7f80]"> Discover items, subscriptions, and services you can purchase with your yield tokens </p>
       </div>

       <SearchBar />
    </div>
  )
}

export default Marketplace