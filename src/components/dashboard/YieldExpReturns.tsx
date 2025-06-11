import React from 'react'
import { RefreshCw, ChevronRight } from 'lucide-react'

const YieldExpReturns = () => {

  const handleExpectedReturnData = (title: string, value: string) => {
    return (
         <div className="w-full flex flex-col gap-[15px] p-[10px] glass-card rounded-[10px]">
            <h3 className="text-(--paraph-color) font-bold text-[1.7vmax] md:text-[1vmax]"> {title}: </h3>
            <h4 className={`font-bold text-[1.7] md:text-[1vmax] ${title == "Approximate USD value" && "text-[#11afb8]"}`}> {title == "price" && "$"}{value} </h4>
         </div>
       )
  }

  return (
    <div className="w-full rounded-[10px] min-h-[300px] p-[30px] bg-brown flex flex-col gap-[10px]">
       <aside>
           <h3 className="font-bold responsive-headerTabs"> Expected Returns </h3>
           <p className="text-(--paraph-color) responsive-paraph"> This section provides projected yield based on your current deposits. Use this information to plan your future purchases in the marketplace. </p>
        </aside>

       <div className='w-full flex flex-col gap-[15px] glass-card p-[15px]'>
          <h3 className="resp-headerCard font-bold"> 30-Day Projection </h3>
          <div className="flex items-center flex-wrap justify-between gap-[10px] w-full">
             { handleExpectedReturnData("Expected YT", "372 YT") }
             { handleExpectedReturnData("372 YT", "$67.32") }
             { handleExpectedReturnData("Daily Rate", "12.4 YT") }
          </div>
          <p className="text-(--paraph-color) font-medium resp-paraphCard"> These projections are based on the current APY of 8.2% and may vary based on market conditions. </p>
       </div>

       <div className="w-full p-[15px] glass-card">
          <aside className="flex flex-col gap-[10px]">
            <h3 className="font-bold text-[1.3vmax] resp-headerCard"> Spending Power </h3>
            <p className="text-(--paraph-color) resp-paraphCard"> With your current yield rate, you can purchase the following items from the marketplace: </p>
          </aside>

          <div className="w-full glass-card flex items-center justify-between p-[10px] mt-[10px]">
              <aside className="flex items-center gap-[10px]"> 
                <RefreshCw className="w-[15px] text-(--mark-txtcolor)" />
                <h3 className="text-[1.5vmax] md:text-[.9vmax]"> Premium Streaming Subscription </h3>
              </aside>

              <ChevronRight className="w-[15px]" />
          </div>
       </div>
    </div>
  )
}

export default YieldExpReturns