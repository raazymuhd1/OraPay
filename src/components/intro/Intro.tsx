import React from 'react'
import { intros } from '@/constants'
import Image from "next/image"

const Intro = () => {
  return (
    <section className="min-h-[600px] flex flex-col items-center justify-center w-[vw] gap-[10px] bg-[rgba(22,22,23,255)] p-[40px]">
        <div className="flex w-full md:w-[60%] flex-col items-center gap-[10px]">
            <h2 className="text-bg-gradient w-full break-all text-[clamp(1.7rem,2vw,2.5rem)] text-center font-bold "> The Future of Financial Freedom </h2>
            <p className="text-[#7f7f80] w-full break-all text-[clamp(1rem,2vw,1.2rem)] text-center font-semibold"> OraPay offers a comprehensive DeFi solution that lets you <br className="lg:inline hidden" /> maintain your capital while spending only the yield you generate. </p>
        </div>

        {/* cards */}
        <div className="grid lg:grid-cols-[repeat(3,minmax(200px,1fr))] grid-cols-[repeat(auto-fit,minmax(150px,1fr))] w-full lg:w-[80%] gap-[30px] justify-center mt-[60px]">
            { intros.map(intro => (
                <div key={intro.id} 
                    className="flex flex-col gap-[10px] border-[1px] border-[#7f7f80] min-h-[250px] rounded-[20px] p-[20px] hover:translate-y-[-10px] transition-all duration-500 cursor-pointer intro-card glass-card">
                    <Image src={intro.img} alt="" className="object-cover w-[40px] h-[40px]" />
                    <h3 className='font-bold text-[1.7vmax] lg:text-[1.2vmax]'> {intro.title} </h3>
                    <p className='font-semibold w-full break-all text-[#7f7f80] text-[1.5vmax] lg:text-[1vmax]'> {intro.desc} </p>
                </div>
            )) }
        </div>
    </section>
  )
}

export default Intro