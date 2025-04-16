import React from 'react'
import { usePeyPeyContext } from '../PeyPeyContext'
import { loading } from '@/assets'
import Image from "next/image"

const LoadingState = () => {
     const { showLoadingState } = usePeyPeyContext()

  return (
    <div className={`${showLoadingState ? "w-full opacity-[1]" : "opacity-[0] h-0 translate-x-[-100px] w-0"} glass-card translate-x-[0px] transition-all duration-500 h-full absolute top-0 left-0`}>
        <div className="w-full h-full flex flex-col justify-center items-center">
           <Image src={loading} alt="loading" className="object-cover w-[60px] loading-animate h-[60px]" />
           <h4> Please wait.. </h4>
        </div>
    </div>
  )
}

export default LoadingState