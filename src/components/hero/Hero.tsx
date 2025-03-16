"use client"
import React from 'react'
import { MoveRight } from "lucide-react"
import { CustomButton } from "@/components"
import Link from 'next/link'
import Squares from '../library-ui/Squares'

const Hero = () => {
  return (
    <section className="w-full h-[700px] relative top-0">
        <div className="w-[30%] h-full items-center justify-center flex flex-col gap-[10px] mx-auto">
            <h4 className="rounded-[30px] text-[.7vmax] text-[#11afb8] bg-[rgba(22,22,23,255)] border-[1px] border-[#7f7f80] py-[3px] px-[8px]"> Introducing: The Future of Payments </h4>
            <h1 className="text-[#0ff0fc] font-bold text-[2.9vmax]"> Buy <span className="text-bg-gradient"> Now, </span> <span className="text-[#fff]"> Pay Never </span> </h1>
            <p className="text-[#7f7f80] font-medium text-[1vmax] text-center"> A revolutionary DeFi protocol that lets you pay merchants <br /> using future yield—not the principal. Generate income, <br /> maintain your capital, and spend only what you earn. </p>

            <div className="flex items-center gap-[20px] mt-[20px]">
                <Link href="/dashboard">
                    <CustomButton disabled={false} style={`bg-gradient h-[50px] w-[150px]`} onClick={() => {}} > Start Now <MoveRight className="" /> </CustomButton>
                </Link>
                <Link href="/">
                    <CustomButton disabled={false} style={`h-[50px] bg-[rgba(22,22,23,255)] w-[150px]`} onClick={() => {}} > Learn More </CustomButton>
                </Link>
            </div>
        </div>

        {/* <Squares 
            speed={0.5} 
            squareSize={40}
            direction='diagonal' // up, down, left, right, diagonal
            borderColor='#fff'
            hoverFillColor='#222'
        /> */}
    </section>
  ) 
}

export default Hero