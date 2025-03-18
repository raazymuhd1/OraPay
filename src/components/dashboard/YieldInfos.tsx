import React from 'react'
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs"
import YieldOverview from './YieldOverview'
import YieldExpDate from './YieldExpDate'
import YieldExpReturns from "./YieldExpReturns"

const YieldInfos = () => {
  return (
    <aside className="w-[70%] mx-auto rounded-[10px] ">
       
       <Tabs defaultValue='overview' className=''>
          <TabsList className="grid w-[30%] bg-brown grid-cols-[repeat(3,minmax(100px,1fr))] items-center gap-[5px]">
             <TabsTrigger value="overview" className="cursor-pointer "> Overview </TabsTrigger>
             <TabsTrigger value="expected-returns" className="cursor-pointer"> Expected Returns </TabsTrigger>
             <TabsTrigger value="expiry" className="cursor-pointer"> Expiry Dates </TabsTrigger>
          </TabsList>
          <TabsContent value="overview" className="mt-[20px]">
              <YieldOverview />
          </TabsContent>
          <TabsContent value="expected-returns"  className="mt-[20px]">
             <YieldExpReturns />
          </TabsContent>
          <TabsContent value="expiry"  className="mt-[20px]">
            <YieldExpDate />
          </TabsContent>
       </Tabs>

    </aside>
  )
}

export default YieldInfos