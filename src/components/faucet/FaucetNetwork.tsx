import React from 'react'

const FaucetNetwork = () => {
  return (
    <section className='p-[20px] flex flex-col gap-[10px] w-full glass-card'>
        <aside className='flex items-center gap-[10px]'>
            <p className='font-bold text-[clamp(14px,.7vw,18px)] text-[var(--paraph-color)]'> <strong> Network: </strong> </p>
            <h4 className='font-extrabold'> Sepolia </h4>
        </aside>
        {/* needs tobe refactored */}
        <div className="flex w-full flex-col">
            <div className='flex w-full justify-between'>
                <h3 className='font-bold text-[clamp(14px,.9vw,16px)]'> Available Amount: </h3>
                <p className='text-[var(--paraph-color)] font-bold text-[clamp(14px,.9vw,16px)]'> 100 USDT </p>
            </div>
            <div className='flex w-full justify-between'>
                <h3 className='font-bold text-[clamp(14px,.9vw,16px)]'> Network: </h3>
                <p className='text-[var(--paraph-color)] text-[clamp(14px,.9vw,16px)]'> Sepolia Testnet </p>
            </div>
        </div>
    </section>
  )
}

export default FaucetNetwork