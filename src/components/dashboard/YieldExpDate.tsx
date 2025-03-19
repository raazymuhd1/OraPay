import React from 'react'

const YieldExpDate = () => {
  return (
    <div className="w-full rounded-[15px] p-[30px] bg-brown min-h-[300px] flex flex-col gap-[20px] bg-brown">
         <aside>
              <h3 className="font-bold responsive-headerTabs"> Expiry Dates </h3>
              <p className="text-(--paraph-color) responsive-paraph"> Timeline for your token expirations </p>
          </aside>

          <div className="flex flex-col gap-[15px] rounded-[15px] p-[15px] glass-card">
              <h3 className='resp-headerCard'> Your PT Expirations </h3>

              <div className="w-full flex flex-col gap-[15px] glass-card p-[20px]">
                  <div className="w-full flex items-center justify-between">
                    <p className="text-[1.9vmax] md:text-[1vmax]"> Dec 31, 2023 </p>
                     <h4 className='text-[1.9vmax] md:text-[1vmax] font-bold'> 8,240PT </h4>
                  </div>

                  <div className="w-full h-[10px] rounded-[15px] bg-[rgba(9,9,11,255)]">
                    <div className={`w-[75%] h-full bg-[rgba(82,122,254,255)] rounded-[15px]`} />
                  </div>

                  <div className="w-full flex items-center justify-between">
                    <p className='text-[1.9vmax] md:text-[1vmax]'> Time remaining: 75% </p>
                     <h4 className='text-[1.9vmax] md:text-[1vmax] font-bold'> 60 days left </h4>
                  </div>
              </div>

               <p className="text-(--paraph-color) resp-paraphCard"> When PT tokens expire, your principal will be returned to you automatically. You can redeem your PT tokens early with a small fee. </p>
          </div>
    </div>
  )
}

export default YieldExpDate