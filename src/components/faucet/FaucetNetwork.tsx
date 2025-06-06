import React from 'react'

const FaucetNetwork = () => {
  return (
    <section className='p-[20px] flex flex-col gap-[10px] w-full glass-card'>
        <h4 className='font-extrabold'> Sepolia </h4>
        <div className="flex w-full flex-col">
            <div className='flex w-full justify-between'>
                <h3 className='font-bold'> Amount </h3>
                <p className='text-[var(--paraph-color)]'> 100 USDC </p>
            </div>
            <div className='flex w-full justify-between'>
                <h3 className='font-bold'> Network </h3>
                <p className='text-[var(--paraph-color)]'> Sepolia Testnet </p>
            </div>
        </div>
    </section>
  )
}

export default FaucetNetwork