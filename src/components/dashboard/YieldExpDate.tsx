import React from 'react'

const YieldExpDate = () => {
  return (
    <div className="w-full rounded-[15px] p-[30px] bg-brown min-h-[300px] flex flex-col gap-[20px] bg-brown">
         <aside>
              <h3 className="font-bold text-[1.5vmax]"> Expiry Dates </h3>
              <p className="text-[#7f7f80]"> Timeline for your token expirations </p>
          </aside>

          <div className="flex flex-col gap-[15px] rounded-[15px] p-[15px] glass-card">
              <h3> Your PT Expirations </h3>

              <div className="w-full flex flex-col gap-[15px] glass-card p-[20px]">
                  <div className="w-full flex items-center justify-between">
                    <p> Dec 31, 2023 </p>
                     <h4> 8,240PT </h4>
                  </div>

                  <div className="w-full h-[10px] rounded-[15px] bg-[rgba(9,9,11,255)]">
                    <div className={`w-[75%] h-full bg-[rgba(82,122,254,255)] rounded-[15px]`} />
                  </div>

                  <div className="w-full flex items-center justify-between">
                    <p> Time remaining: 75% </p>
                     <h4> 60 days left </h4>
                  </div>
              </div>

               <p className="text-[#7f7f80]"> When PT tokens expire, your principal will be returned to you automatically. You can redeem your PT tokens early with a small fee. </p>
          </div>
    </div>
  )
}

export default YieldExpDate