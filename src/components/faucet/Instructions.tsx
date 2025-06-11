import React from 'react'

const instructions = ["Enter your wallet address to receive testnet token", "token can be claimed once every 24 hours", "This token have no real value and are for testing only", "Make sure you're connected to the correct testnet"]

const Instructions = () => {
  return (
    <section className='w-full flex flex-col gap-[10px] glass-card p-[20px]'>
        <h2 className='font-bold text-[clamp(16px,1vw,25px]'> 🚧 Instructions </h2>

        <ul className='flex w-full list-container flex-col gap-[10px] p-[20px]'>
            { instructions.map((instruct, idx) => (
                <li key={idx} className='w-full text-[clamp(14px,.7vw,16px)]'> {instruct} </li>
            )) }
        </ul>
    </section>
  )
}

export default Instructions