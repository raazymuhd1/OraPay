import React from 'react'

const instructions = ["Enter your wallet address to receive testnet tokens", "Each token can be claimed once every 24 hours", "These tokens have no real value and are for testing only", "Make sure you're connected to the correct testnet"]

const Instructions = () => {
  return (
    <section className='w-full flex flex-col gap-[25px] glass-card p-[20px]'>
        <h2 className='font-bold text-[clamp(1vw,1.6vw,2vw)]'> Instructions </h2>

        <ul className='flex flex-col gap-[10px]'>
            { instructions.map((instruct, idx) => (
                <li key={idx} className=''> {instruct} </li>
            )) }
        </ul>
    </section>
  )
}

export default Instructions