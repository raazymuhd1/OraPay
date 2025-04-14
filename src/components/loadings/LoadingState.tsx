import React from 'react'
import { usePeyPeyContext } from '../PeyPeyContext'
import { loading } from '@/assets'
import Image from "next/image"

const LoadingState = () => {
     const { showLoadingState } = usePeyPeyContext()

  return (
    <div className={`${showLoadingState ? "w-full opacity-[1] h-full absolute top-0 left-0" : "opacity-[0] h-0 w-0"} glass-card transition-all duration-500`}>
        <div className="w-full h-full flex justify-center items-center">
           <Image src={loading} alt="loading" className="object-cover w-[60px] h-[60px]" />
        </div>
    </div>
  )
}

export default LoadingState