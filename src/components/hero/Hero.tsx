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

        <div className="w-[80%] md:w-[50%] h-full items-center justify-center flex flex-col gap-[10px] mx-auto">
            <h4 className="rounded-[30px] w-[fit-content] whitespace-nowrap lg:text-[.7vmax] md:text-[1.8vmax] text-[1.4vmax] text-[#11afb8] bg-[rgba(22,22,23,255)] border-[1px] border-[#7f7f80] py-[3px] px-[8px]"> Introducing: The Future of Payments </h4>
            <h2 className="text-[#0ff0fc] font-bold text-[clamp(1.7rem,2vw,2.7rem)]">
                Buy
                <span className="text-bg-gradient"> Now, </span>
                <span className="text-[#fff]"> Pay Never </span>
            </h2>
            <p className="text-[#7f7f80] font-medium text-[clamp(1rem,2vw,1.2rem)] w-full text-center"> A revolutionary DeFi protocol that lets you pay merchants 
                <br className="hidden md:inline" /> using future yield—not the principal. Generate income, 
                <br className="hidden md:inline" /> maintain your capital, and spend only what you earn.
             </p>

            <div className="flex items-center gap-[20px] mt-[20px]">
                <Link href="/dashboard">
                    <CustomButton 
                        ref={btnRef}
                        mouseEvent={handleOnMouseEnter}
                        mouseLeave={handleOnMouseLeave}
                        disabled={false} style={`bg-gradient h-[30px]  lg:h-[50px] w-[150px] hover:translate-y-[-5px] transition-all duration-500 lg:text-[.9vmax] text-[1.3vmax]`} onClick={() => {}} > Start Now <MoveRight className="" /> </CustomButton>
                </Link>
                <Link href="/">
                    <CustomButton 
                            disabled={false} 
                            style={` h-[30px] lg:h-[50px] bg-[rgba(22,22,23,255)] w-[150px] text-[1.3vmax] lg:text-[.9vmax]`} 
                            onClick={() => {}} > Learn More 
                    </CustomButton>
                </Link>
            </div>
        </div>

        <div className="h-[200px] rounded-[50%] shadowing-right bg-[rgba(82,122,254,255)]" />

    </section>
  ) 
}

export default Hero