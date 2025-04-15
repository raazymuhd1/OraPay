import React from 'react'
import { usePeyPeyContext } from '../PeyPeyContext'
import { loading } from '@/assets'
import Image from "next/image"

const LoadingState = () => {
     const { showLoadingState } = usePeyPeyContext()

  return (
    <div className={`${showLoadingState ? "w-full translate-x-[0px] opacity-[1] h-full absolute top-0 left-0" : "opacity-[0] h-0 translate-x-[-100px] w-0"} glass-card transition-all duration-500`}>
        <div className="w-full h-full flex justify-center items-center">
           <Image src={loading} alt="loading" className="object-cover w-[60px] loading-animate h-[60px]" />
        </div>
    </div>
  )
}

export default LoadingState