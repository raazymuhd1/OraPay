"use client"
import {useRef} from 'react'
import { MoveRight } from "lucide-react"
import { CustomButton } from "@/components"
import Link from 'next/link'

const Hero = () => {
        const btnRef = useRef<HTMLButtonElement>(null)

        const handleOnMouseEnter = () => {
            console.log(btnRef.current)
            btnRef.current?.classList.add("btn-shadow")
        }

        const handleOnMouseLeave = () => {
            console.log(btnRef.current)
            btnRef.current?.classList.remove("btn-shadow")
        }

  return (
    <section className="w-full h-[700px] relative bottom-0 mx-auto flex items-center gap-[10px]">
        
        <div className=" h-[200px] rounded-[50%] shadowing-left bg-[rgba(82,122,254,255)]" />

        <div className="w-[50%] h-full items-center justify-center flex flex-col gap-[10px] mx-auto">
            <h4 className="rounded-[30px] text-[.7vmax] text-[#11afb8] bg-[rgba(22,22,23,255)] border-[1px] border-[#7f7f80] py-[3px] px-[8px]"> Introducing: The Future of Payments </h4>
            <h2 className="text-[#0ff0fc] font-bold text-[2.9vmax]">
                Buy
                <span className="text-bg-gradient"> Now </span>
                <span className="text-[#fff]"> Pay Never </span>
            </h2>
            <p className="text-[#7f7f80] font-medium text-[1vmax] text-center"> A revolutionary DeFi protocol that lets you pay merchants <br /> using future yield—not the principal. Generate income, <br /> maintain your capital, and spend only what you earn. </p>

            <div className="flex items-center gap-[20px] mt-[20px]">
                <Link href="/dashboard">
                    <CustomButton 
                        ref={btnRef}
                        mouseEvent={handleOnMouseEnter}
                        mouseLeave={handleOnMouseLeave}
                        disabled={false} style={`bg-gradient h-[50px] w-[150px] hover:translate-y-[-5px] transition-all duration-500`} onClick={() => {}} > Start Now <MoveRight className="" /> </CustomButton>
                </Link>
                <Link href="/">
                    <CustomButton disabled={false} style={`h-[50px] bg-[rgba(22,22,23,255)] w-[150px]`} onClick={() => {}} > Learn More </CustomButton>
                </Link>
            </div>
        </div>

        <div className="h-[200px] rounded-[50%] shadowing-right bg-[rgba(82,122,254,255)]" />

    </section>
  ) 
}

export default Hero