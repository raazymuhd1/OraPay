import React from 'react'
import { intros } from '@/constants'

const Intro = () => {
  return (
    <section className="min-h-[600px] flex flex-col items-center justify-center w-full gap-[10px] bg-[rgba(22,22,23,255)] p-[40px]">
        <div className="flex w-full md:w-[60%] flex-col items-center gap-[10px]">
            <h2 className="text-bg-gradient text-[clamp(1.7rem,2vw,2.5rem)] text-center font-bold "> The Future of Financial Freedom </h2>
            <p className="text-[#7f7f80] text-[clamp(1rem,2vw,1.2rem)] text-center lg:text-left font-semibold"> NoPeyPey offers a comprehensive DeFi solution that lets you <br className="lg:inline hidden" /> maintain your capital while spending only the yield you generate. </p>
            {/* <svg height={300} width={300}>
                <line x1="10" y1="10" x2="120" y2="100" stroke='red' strokeWidth={20} width={200} height={200} />
            </svg> */}

        </div>

        <div className="flex items-center justify-center flex-wrap w-[80%] gap-[30px] mt-[60px]">
            { intros.map(intro => (
                <div key={intro.id} 
                    className="flex flex-col gap-[10px] basis-[200px] lg:basis-[400px] border-[1px] border-[#7f7f80] h-[250px] rounded-[20px] p-[20px] hover:translate-y-[-10px] transition-all duration-500 cursor-pointer intro-card glass-card">
                    <h3 className='font-bold text-[1.7vmax] lg:text-[1.2vmax]'> {intro.title} </h3>
                    <p className='font-semibold text-[#7f7f80] text-[1.5vmax] lg:text-[1vmax]'> {intro.desc} </p>
                </div>
            )) }
        </div>
    </section>
  )
}

export default Intro