import React from 'react'
import { CustomButton } from "@/components"

const NotFound = () => {
  return (
    <section className="w-full">
        <div className="flex items-center gap-[20px] mt-[40px]">
            <h2 className="font-bold text-[2vmax] "> This page is not exist </h2>
            <h4> Back Home </h4>
        </div>
    </section>
  )
}

export default NotFound