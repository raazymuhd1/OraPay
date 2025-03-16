import React from 'react'
import { intros } from '@/constants'

const Intro = () => {
  return (
    <section className="h-[600px] flex flex-col items-center justify-center w-full gap-[10px] bg-[rgba(22,22,23,255)]">
        <div className="flex flex-col items-center gap-[10px]">
            <h2 className="text-bg-gradient text-[2vmax] font-bold "> The Future of Financial Freedom </h2>
            <p className="text-[#7f7f80] text-[1vmax] font-semibold"> NoPeyPey offers a comprehensive DeFi solution that lets you <br /> maintain your capital while spending only the yield you generate. </p>
        </div>

        <div className="flex items-center justify-center flex-wrap w-[80%] gap-[30px] mt-[60px]">
            { intros.map(intro => (
                <div key={intro.id} className="flex flex-col gap-[10px] basis-[400px] border-[1px] border-[#7f7f80] h-[250px] rounded-[10px] p-[20px]">
                    <h3 className='font-bold text-[1.2vmax]'> {intro.title} </h3>
                    <p className='font-semibold text-[#7f7f80]'> {intro.desc} </p>
                </div>
            )) }
        </div>
    </section>
  )
}

export default Intro